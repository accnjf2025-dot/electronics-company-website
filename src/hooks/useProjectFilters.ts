import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  DEFAULT_PROJECT_FILTERS,
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
    updateFilters,
    setFilter,
    clearFilters,
    hasActiveFilters,
  }
}
