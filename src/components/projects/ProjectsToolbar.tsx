import { useCallback, useRef, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import type { ProjectFilterState, ProjectSortOption } from '@/utils/projectPortfolio'
import { countActiveProjectFilters } from '@/utils/projectPortfolio'
import { useTranslation } from '@/utils'

interface ProjectsToolbarProps {
  filters: ProjectFilterState
  resultCount: number
  onSearchChange: (search: string) => void
  onSortChange: (sort: ProjectSortOption) => void
  onOpenFilters: () => void
  resetKey?: number
}

export function ProjectsToolbar({
  filters,
  resultCount,
  onSearchChange,
  onSortChange,
  onOpenFilters,
  resetKey = 0,
}: ProjectsToolbarProps) {
  const { t } = useTranslation()
  const [draftSearch, setDraftSearch] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeCount = countActiveProjectFilters(filters)
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

  const sortOptions: { value: ProjectSortOption; label: string }[] = [
    { value: 'newest', label: t.projectsCatalog.sortNewest },
    { value: 'oldest', label: t.projectsCatalog.sortOldest },
    { value: 'name', label: t.projectsCatalog.sortName },
  ]

  return (
    <div className="mb-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="relative min-w-0 flex-1 sm:min-w-[220px]">
          <label htmlFor="project-search" className="sr-only">
            {t.projectsCatalog.searchLabel}
          </label>
          <Search
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
          <input
            key={resetKey}
            id="project-search"
            type="search"
            value={searchValue}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder={t.projectsCatalog.searchPlaceholder}
            className="h-full min-h-[42px] w-full rounded-lg border border-surface-200 bg-white py-2.5 ps-10 pe-4 text-sm text-brand-navy placeholder:text-text-muted focus-visible:border-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/30"
          />
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onOpenFilters}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-surface-200 bg-white px-4 py-2.5 text-sm font-medium text-brand-navy transition-colors hover:border-brand-yellow/50 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            <SlidersHorizontal className="size-4 shrink-0" aria-hidden="true" />
            {t.projectsCatalog.filters}
            {activeCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-brand-navy">
                {activeCount}
              </span>
            )}
          </button>

          <div className="min-w-[148px] flex-1 sm:min-w-[180px] sm:flex-none">
            <label htmlFor="project-sort" className="sr-only">
              {t.projectsCatalog.sortBy}
            </label>
            <select
              id="project-sort"
              value={filters.sort}
              onChange={(e) => onSortChange(e.target.value as ProjectSortOption)}
              className="h-full min-h-[42px] w-full rounded-lg border border-surface-200 bg-white px-3 py-2.5 text-sm text-brand-navy focus-visible:border-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/30"
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

      <p className="mt-3 text-sm text-text-secondary">
        <span className="font-semibold text-brand-navy">{resultCount}</span>{' '}
        {t.projectsCatalog.resultsCount}
      </p>
    </div>
  )
}
