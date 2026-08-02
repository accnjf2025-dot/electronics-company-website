import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  DEFAULT_FILTERS,
  filtersToParams,
  parseFiltersFromParams,
  type ProductFilterState,
} from '@/utils/products'

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(
    () => parseFiltersFromParams(searchParams),
    [searchParams],
  )

  const updateFilters = useCallback(
    (partial: Partial<ProductFilterState>) => {
      const next = { ...filters, ...partial }
      setSearchParams(filtersToParams(next), { replace: true })
    },
    [filters, setSearchParams],
  )

  const setFilter = useCallback(
    <K extends keyof ProductFilterState>(key: K, value: ProductFilterState[K]) => {
      updateFilters({ [key]: value })
    },
    [updateFilters],
  )

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true })
  }, [setSearchParams])

  const hasActiveFilters = useMemo(() => {
    return JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS)
  }, [filters])

  return {
    filters,
    updateFilters,
    setFilter,
    clearFilters,
    hasActiveFilters,
  }
}
