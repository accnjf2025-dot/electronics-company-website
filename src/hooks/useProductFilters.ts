import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '@/data'
import {
  DEFAULT_FILTERS,
  filterProducts,
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

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [filters],
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
    filteredProducts,
    updateFilters,
    setFilter,
    clearFilters,
    hasActiveFilters,
  }
}
