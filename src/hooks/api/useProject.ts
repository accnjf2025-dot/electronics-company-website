import { useCallback, useEffect, useMemo, useState } from 'react'
import { getProjectBySlug } from '@/data'
import { isNotFoundError, shouldUseMockFallback } from '@/lib/api/fallback'
import { fetchProjectBySlug, fetchRelatedProjects } from '@/lib/api/projects'
import type { DataSource } from '@/lib/api/types'
import { getRelatedProjects } from '@/utils/projectPortfolio'
import type { Project } from '@/types'
import { useTranslation } from '@/utils'

export function useProject(slug: string | undefined) {
  const [project, setProject] = useState<Project | undefined>()
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
        const data = await fetchProjectBySlug(currentSlug, controller.signal)
        if (!active) return
        setProject(data)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (isNotFoundError(err)) {
          setProject(undefined)
          setNotFound(true)
          setSource('api')
          return
        }
        if (shouldUseMockFallback()) {
          const mockProject = getProjectBySlug(currentSlug)
          setProject(mockProject)
          setNotFound(!mockProject)
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setProject(undefined)
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
        project: undefined,
        loading: false,
        error: null,
        notFound: true,
        source: 'api' as const,
        retry,
      }
    }

    return { project, loading, error, notFound, source, retry }
  }, [slug, project, loading, error, notFound, source, retry])
}

export function useRelatedProjects(project: Project | undefined, limit = 3) {
  const { locale } = useTranslation()
  const [related, setRelated] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState<DataSource>('api')

  useEffect(() => {
    if (!project) return

    const currentProject = project
    const controller = new AbortController()
    let active = true

    async function load() {
      setLoading(true)
      try {
        const data = await fetchRelatedProjects(
          currentProject,
          limit,
          locale,
          controller.signal,
        )
        if (!active) return
        if (data.length > 0) {
          setRelated(data)
          setSource('api')
        } else if (shouldUseMockFallback()) {
          setRelated(getRelatedProjects(currentProject, limit))
          setSource('mock')
        } else {
          setRelated([])
          setSource('api')
        }
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          setRelated(getRelatedProjects(currentProject, limit))
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
  }, [project, limit, locale])

  return useMemo(
    () => ({
      related: project ? related : [],
      loading: project ? loading : false,
      source,
    }),
    [project, related, loading, source],
  )
}
