import { useCallback, useEffect, useMemo, useState } from 'react'
import { projects as mockProjects } from '@/data/projects'
import { shouldUseMockFallback } from '@/lib/api/fallback'
import { fetchFeaturedProjects, fetchProjects } from '@/lib/api/projects'
import type { DataSource } from '@/lib/api/types'
import { filterProjects, type ProjectFilterState } from '@/utils/projectPortfolio'
import type { Project } from '@/types'
import { useTranslation } from '@/utils'

interface UseProjectsOptions {
  filters: ProjectFilterState
  enabled?: boolean
}

export function useProjects({ filters, enabled = true }: UseProjectsOptions) {
  const { locale } = useTranslation()
  const [projects, setProjects] = useState<Project[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [source, setSource] = useState<DataSource>('api')
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    if (!enabled) return

    const controller = new AbortController()
    let active = true

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const result = await fetchProjects(filters, locale, controller.signal)
        if (!active) return
        setProjects(result.projects)
        setCount(result.count)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          const mockFiltered = filterProjects(mockProjects, filters)
          setProjects(mockFiltered)
          setCount(mockFiltered.length)
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setProjects([])
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
  }, [enabled, filters, locale, reloadKey])

  return useMemo(
    () => ({ projects, count, loading, error, source, retry }),
    [projects, count, loading, error, source, retry],
  )
}

export function useFeaturedProjects() {
  const { locale } = useTranslation()
  const [projects, setProjects] = useState<Project[]>([])
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
        const data = await fetchFeaturedProjects(locale, controller.signal)
        if (!active) return
        if (data.length > 0) {
          setProjects(data)
          setSource('api')
        } else if (shouldUseMockFallback()) {
          const { getFeaturedProjects } = await import('@/data')
          setProjects(getFeaturedProjects())
          setSource('mock')
        } else {
          setProjects([])
          setSource('api')
        }
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          const { getFeaturedProjects } = await import('@/data')
          setProjects(getFeaturedProjects())
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setProjects([])
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
  }, [locale, reloadKey])

  return useMemo(
    () => ({ projects, loading, error, source, retry, hasProjects: projects.length > 0 }),
    [projects, loading, error, source, retry],
  )
}
