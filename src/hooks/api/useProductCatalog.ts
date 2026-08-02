import { useCallback, useEffect, useMemo, useState } from 'react'
import { productCategories as mockCategories } from '@/data'
import { ApiError } from '@/lib/api/client'
import { shouldUseMockFallback } from '@/lib/api/fallback'
import { fetchProductCategories } from '@/lib/api/products'
import type { DataSource } from '@/lib/api/types'
import type { ProductCategory } from '@/types'

export function useProductCategories() {
  const [categories, setCategories] = useState<ProductCategory[]>([])
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
        const data = await fetchProductCategories(controller.signal)
        if (!active) return
        setCategories(data)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          setCategories(mockCategories)
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setCategories([])
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
  }, [reloadKey])

  return useMemo(
    () => ({ categories, loading, error, source, retry }),
    [categories, loading, error, source, retry],
  )
}

export function useBrandOptions() {
  const [brands, setBrands] = useState<{ name: string; slug: string }[]>([])
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
        const { fetchBrands } = await import('@/lib/api/products')
        const data = await fetchBrands(controller.signal)
        if (!active) return
        setBrands(data.map((brand) => ({ name: brand.name, slug: brand.slug })))
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          const { getUniqueBrands } = await import('@/utils/products')
          setBrands(getUniqueBrands().map((name) => ({ name, slug: name.toLowerCase() })))
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setBrands([])
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
  }, [reloadKey])

  const brandNames = useMemo(() => brands.map((brand) => brand.name), [brands])

  const resolveBrandSlug = useCallback(
    (brandName: string) => brands.find((brand) => brand.name === brandName)?.slug,
    [brands],
  )

  return useMemo(
    () => ({ brands, brandNames, loading, error, source, retry, resolveBrandSlug }),
    [brands, brandNames, loading, error, source, retry, resolveBrandSlug],
  )
}

export function isApiUnavailableError(error: unknown): boolean {
  return error instanceof ApiError || error instanceof TypeError
}
