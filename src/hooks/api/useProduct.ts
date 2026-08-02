import { useCallback, useEffect, useMemo, useState } from 'react'
import { getProductBySlug } from '@/data'
import { isNotFoundError, shouldUseMockFallback } from '@/lib/api/fallback'
import { fetchProductBySlug, fetchRelatedProducts } from '@/lib/api/products'
import type { DataSource } from '@/lib/api/types'
import { getRelatedProducts } from '@/utils/products'
import type { Product } from '@/types'
import { useTranslation } from '@/utils'

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | undefined>()
  const [loading, setLoading] = useState(Boolean(slug))
  const [error, setError] = useState<unknown>(null)
  const [notFound, setNotFound] = useState(false)
  const [source, setSource] = useState<DataSource>('api')
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    if (!slug) return

    const currentSlug = slug
    const controller = new AbortController()
    let active = true

    async function load() {
      setLoading(true)
      setError(null)
      setNotFound(false)

      try {
        const data = await fetchProductBySlug(currentSlug, controller.signal)
        if (!active) return
        setProduct(data)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (isNotFoundError(err)) {
          setProduct(undefined)
          setNotFound(true)
          setSource('api')
          return
        }
        if (shouldUseMockFallback()) {
          const mockProduct = getProductBySlug(currentSlug)
          setProduct(mockProduct)
          setNotFound(!mockProduct)
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setProduct(undefined)
          setNotFound(false)
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
  }, [slug, reloadKey])

  return useMemo(() => {
    if (!slug) {
      return {
        product: undefined,
        loading: false,
        error: null,
        notFound: true,
        source: 'api' as const,
        retry,
      }
    }

    return { product, loading, error, notFound, source, retry }
  }, [slug, product, loading, error, notFound, source, retry])
}

export function useRelatedProducts(product: Product | undefined, limit = 4) {
  const { locale } = useTranslation()
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState<DataSource>('api')

  useEffect(() => {
    if (!product) return

    const currentProduct = product
    const controller = new AbortController()
    let active = true

    async function load() {
      setLoading(true)
      try {
        const data = await fetchRelatedProducts(
          currentProduct,
          limit,
          locale,
          controller.signal,
        )
        if (!active) return
        if (data.length > 0) {
          setRelated(data)
          setSource('api')
        } else if (shouldUseMockFallback()) {
          setRelated(getRelatedProducts(currentProduct, limit))
          setSource('mock')
        } else {
          setRelated([])
          setSource('api')
        }
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          setRelated(getRelatedProducts(currentProduct, limit))
          setSource('mock')
        } else {
          setRelated([])
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
  }, [product, limit, locale])

  return useMemo(
    () => ({
      related: product ? related : [],
      loading: product ? loading : false,
      source,
    }),
    [product, related, loading, source],
  )
}
