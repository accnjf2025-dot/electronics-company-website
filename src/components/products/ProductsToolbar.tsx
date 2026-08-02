import { useCallback, useRef, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import type { ProductFilterState, SortOption } from '@/utils/products'
import { countActiveFilters } from '@/utils/products'
import { useTranslation } from '@/utils'

interface ProductsToolbarProps {
  filters: ProductFilterState
  resultCount: number
  onSearchChange: (search: string) => void
  onSortChange: (sort: SortOption) => void
  onOpenFilters: () => void
  resetKey?: number
}

export function ProductsToolbar({
  filters,
  resultCount,
  onSearchChange,
  onSortChange,
  onOpenFilters,
  resetKey = 0,
}: ProductsToolbarProps) {
  const { t } = useTranslation()
  const [draftSearch, setDraftSearch] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeCount = countActiveFilters(filters)
  const searchValue = draftSearch ?? filters.search

  const handleSearchInput = useCallback(
    (value: string) => {
      setDraftSearch(value)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        onSearchChange(value)
        setDraftSearch(null)
      }, 300)
    },
    [onSearchChange],
  )

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: t.catalog.sortNewest },
    { value: 'price-asc', label: t.catalog.sortPriceAsc },
    { value: 'price-desc', label: t.catalog.sortPriceDesc },
    { value: 'name', label: t.catalog.sortName },
  ]

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="product-search" className="sr-only">
            {t.catalog.searchLabel}
          </label>
          <Search
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
          <input
            key={resetKey}
            id="product-search"
            type="search"
            value={searchValue}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder={t.catalog.searchPlaceholder}
            className="w-full rounded-lg border border-surface-200 bg-white py-2.5 ps-10 pe-4 text-sm text-brand-navy placeholder:text-text-muted focus-visible:border-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/30"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onOpenFilters}
            className="inline-flex items-center gap-2 rounded-lg border border-surface-200 bg-white px-4 py-2.5 text-sm font-medium text-brand-navy transition-colors hover:border-brand-yellow/50 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            {t.catalog.filters}
            {activeCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-brand-navy">
                {activeCount}
              </span>
            )}
          </button>

          <div className="flex-1 sm:flex-none">
            <label htmlFor="product-sort" className="sr-only">
              {t.catalog.sortBy}
            </label>
            <select
              id="product-sort"
              value={filters.sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full rounded-lg border border-surface-200 bg-white px-3 py-2.5 text-sm text-brand-navy focus-visible:border-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/30 sm:min-w-[180px]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-text-secondary">
        <span className="font-semibold text-brand-navy">{resultCount}</span>{' '}
        {t.catalog.resultsCount}
      </p>
    </div>
  )
}
