import { useCallback, useEffect, useMemo, useState } from 'react'
import { services as mockServices } from '@/data/services'
import { shouldUseMockFallback } from '@/lib/api/fallback'
import { fetchFeaturedServices, fetchServices } from '@/lib/api/corporate'
import type { DataSource } from '@/lib/api/types'
import type { Service } from '@/types/service'

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
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
        const data = await fetchServices(controller.signal)
        if (!active) return
        setServices(data)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          setServices(mockServices)
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setServices([])
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
    () => ({ services, loading, error, source, retry, hasServices: services.length > 0 }),
    [services, loading, error, source, retry],
  )
}

export function useFeaturedServices(limit = 6) {
  const [services, setServices] = useState<Service[]>([])
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
        const data = await fetchFeaturedServices(limit, controller.signal)
        if (!active) return
        setServices(data)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          setServices(mockServices.slice(0, limit))
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setServices([])
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
    () => ({ services, loading, error, source, retry, hasServices: services.length > 0 }),
    [services, loading, error, source, retry],
  )
}
