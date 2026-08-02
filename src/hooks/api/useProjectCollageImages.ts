import { useCallback, useEffect, useMemo, useState } from 'react'
import { projects as mockProjects, getFeaturedProjects } from '@/data/projects'
import { shouldUseMockFallback } from '@/lib/api/fallback'
import { fetchFeaturedProjects, fetchProjects } from '@/lib/api/projects'
import type { DataSource } from '@/lib/api/types'
import type { Project } from '@/types'
import { useTranslation } from '@/utils'

const PLACEHOLDER_PATTERN = /placeholder/i

export function hasValidProjectImage(src: string): boolean {
  return Boolean(src?.trim()) && !PLACEHOLDER_PATTERN.test(src)
}

function collectProjectsWithImages(projects: Project[], max: number): Project[] {
  const seen = new Set<string>()
  const result: Project[] = []

  for (const project of projects) {
    if (!hasValidProjectImage(project.coverImage) || seen.has(project.id)) continue
    seen.add(project.id)
    result.push(project)
    if (result.length >= max) break
  }

  return result
}

const emptyFilters = {
  search: '',
  category: '',
  location: '',
  featured: '',
  sort: 'newest' as const,
}

export function useProjectCollageImages(maxImages = 3) {
  const { locale } = useTranslation()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<DataSource>('api')
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      setLoading(true)

      try {
        const featured = await fetchFeaturedProjects(locale, controller.signal)
        let collage = collectProjectsWithImages(featured, maxImages)

        if (collage.length < maxImages) {
          const { projects: allProjects } = await fetchProjects(
            emptyFilters,
            locale,
            controller.signal,
          )
          collage = collectProjectsWithImages([...featured, ...allProjects], maxImages)
        }

        if (!active) return
        setProjects(collage)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return

        if (shouldUseMockFallback()) {
          const featuredMock = getFeaturedProjects()
          const collage = collectProjectsWithImages(
            [...featuredMock, ...mockProjects],
            maxImages,
          )
          setProjects(collage)
          setSource('mock')
        } else {
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
  }, [locale, maxImages, reloadKey])

  return useMemo(
    () => ({
      projects,
      loading,
      source,
      retry,
      hasProjectImages: projects.length > 0,
    }),
    [projects, loading, source, retry],
  )
}
