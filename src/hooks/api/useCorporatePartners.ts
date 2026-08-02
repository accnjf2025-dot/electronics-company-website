import { useCallback, useEffect, useMemo, useState } from 'react'
import { partners as mockPartners } from '@/data/partners'
import { shouldUseMockFallback } from '@/lib/api/fallback'
import { fetchFeaturedPartners, fetchPartners } from '@/lib/api/corporate'
import type { DataSource } from '@/lib/api/types'
import type { Partner } from '@/types/partner'

export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>([])
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
        const data = await fetchPartners(controller.signal)
        if (!active) return
        setPartners(data)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          setPartners(mockPartners)
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setPartners([])
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
    () => ({ partners, loading, error, source, retry, hasPartners: partners.length > 0 }),
    [partners, loading, error, source, retry],
  )
}

export function useFeaturedPartners(limit = 8) {
  const [partners, setPartners] = useState<Partner[]>([])
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
        const data = await fetchFeaturedPartners(limit, controller.signal)
        if (!active) return
        setPartners(data)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          setPartners(mockPartners.slice(0, limit))
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setPartners([])
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
  }, [limit, reloadKey])

  return useMemo(
    () => ({ partners, loading, error, source, retry, hasPartners: partners.length > 0 }),
    [partners, loading, error, source, retry],
  )
}
