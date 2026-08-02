import { useCallback, useEffect, useMemo, useState } from 'react'
import { products as mockProducts } from '@/data'
import { shouldUseMockFallback } from '@/lib/api/fallback'
import { fetchProducts } from '@/lib/api/products'
import type { DataSource } from '@/lib/api/types'
import { filterProducts, type ProductFilterState } from '@/utils/products'
import type { Product } from '@/types'
import { useTranslation } from '@/utils'

interface UseProductsOptions {
  filters: ProductFilterState
  resolveBrandSlug: (brandName: string) => string | undefined
  enabled?: boolean
}

export function useProducts({ filters, resolveBrandSlug, enabled = true }: UseProductsOptions) {
  const { locale } = useTranslation()
  const [products, setProducts] = useState<Product[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [source, setSource] = useState<DataSource>('api')
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => setReloadKey((key) => key + 1), [])

  const brandSlug = useMemo(
    () => (filters.brand ? resolveBrandSlug(filters.brand) : undefined),
    [filters.brand, resolveBrandSlug],
  )

  useEffect(() => {
    if (!enabled) return

    const controller = new AbortController()
    let active = true

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const result = await fetchProducts(
          {
            filters,
            brandSlug,
            locale,
          },
          controller.signal,
        )
        if (!active) return
        setProducts(result.products)
        setCount(result.count)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          const mockFiltered = filterProducts(mockProducts, filters)
          setProducts(mockFiltered)
          setCount(mockFiltered.length)
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setProducts([])
          setCount(0)
          setSource('api')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()
    return () => {
      active = false
      controller.abort()
    }
  }, [enabled, filters, brandSlug, locale, reloadKey])

  return useMemo(
    () => ({ products, count, loading, error, source, retry }),
    [products, count, loading, error, source, retry],
  )
}

export function useFeaturedProducts(limit = 6) {
  const { locale } = useTranslation()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [source, setSource] = useState<DataSource>('api')
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const { fetchFeaturedProducts } = await import('@/lib/api/products')
        const data = await fetchFeaturedProducts(limit, locale, controller.signal)
        if (!active) return
        if (data.length > 0) {
          setProducts(data)
          setSource('api')
        } else if (shouldUseMockFallback()) {
          const { getFeaturedProducts } = await import('@/data')
          setProducts(getFeaturedProducts().slice(0, limit))
          setSource('mock')
        } else {
          setProducts([])
          setSource('api')
        }
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          const { getFeaturedProducts } = await import('@/data')
          setProducts(getFeaturedProducts().slice(0, limit))
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setProducts([])
          setSource('api')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()
    return () => {
      active = false
      controller.abort()
    }
  }, [limit, locale, reloadKey])

  return useMemo(
    () => ({ products, loading, error, source, retry, hasProducts: products.length > 0 }),
    [products, loading, error, source, retry],
  )
}
