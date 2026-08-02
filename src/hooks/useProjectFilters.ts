import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { projects } from '@/data/projects'
import {
  DEFAULT_PROJECT_FILTERS,
  filterProjects,
  projectFiltersToParams,
  parseProjectFiltersFromParams,
  type ProjectFilterState,
} from '@/utils/projectPortfolio'

export function useProjectFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(
    () => parseProjectFiltersFromParams(searchParams),
    [searchParams],
  )

  const filteredProjects = useMemo(
    () => filterProjects(projects, filters),
    [filters],
  )

  const updateFilters = useCallback(
    (partial: Partial<ProjectFilterState>) => {
      const next = { ...filters, ...partial }
      setSearchParams(projectFiltersToParams(next), { replace: true })
    },
    [filters, setSearchParams],
  )

  const setFilter = useCallback(
    <K extends keyof ProjectFilterState>(key: K, value: ProjectFilterState[K]) => {
      updateFilters({ [key]: value })
    },
    [updateFilters],
  )

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true })
  }, [setSearchParams])

  const hasActiveFilters = useMemo(() => {
    return JSON.stringify(filters) !== JSON.stringify(DEFAULT_PROJECT_FILTERS)
  }, [filters])

  return {
    filters,
    filteredProjects,
    updateFilters,
    setFilter,
    clearFilters,
    hasActiveFilters,
  }
}
