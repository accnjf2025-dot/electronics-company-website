import { useCallback, useEffect, useMemo, useState } from 'react'
import { projectCategories as mockCategories } from '@/data/projectCategories'
import { shouldUseMockFallback } from '@/lib/api/fallback'
import {
  fetchProjectCategories,
  fetchProjectLocationOptions,
} from '@/lib/api/projects'
import type { DataSource } from '@/lib/api/types'
import { getProjectLocationFilterOptions } from '@/utils/projectPortfolio'
import type { ProjectCategory } from '@/types'

export function useProjectCategories() {
  const [categories, setCategories] = useState<ProjectCategory[]>([])
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
        const data = await fetchProjectCategories(controller.signal)
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

export function useProjectLocations() {
  const [locationOptions, setLocationOptions] = useState<
    { value: string; labelAr: string; labelEn: string }[]
  >([])
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
        const data = await fetchProjectLocationOptions(controller.signal)
        if (!active) return
        setLocationOptions(data)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          setLocationOptions(getProjectLocationFilterOptions())
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setLocationOptions([])
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
    () => ({ locationOptions, loading, error, source, retry }),
    [locationOptions, loading, error, source, retry],
  )
}
