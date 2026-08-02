import type { ReactNode } from 'react'
import { projectCategories } from '@/data/projectCategories'
import type { ProjectFilterState, ProjectSortOption } from '@/utils/projectPortfolio'
import { pickLocalized, useTranslation } from '@/utils'

interface ProjectsFiltersProps {
  filters: ProjectFilterState
  locationOptions: { value: string; labelAr: string; labelEn: string }[]
  onFilterChange: <K extends keyof ProjectFilterState>(
    key: K,
    value: ProjectFilterState[K],
  ) => void
  onClearFilters: () => void
  showSort?: boolean
  idPrefix?: string
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-navy">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-brand-navy focus-visible:border-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/30"
      >
        {children}
      </select>
    </div>
  )
}

export function ProjectsFilters({
  filters,
  locationOptions,
  onFilterChange,
  onClearFilters,
  showSort = false,
  idPrefix = 'proj-filter',
}: ProjectsFiltersProps) {
  const { t, locale } = useTranslation()

  const sortOptions: { value: ProjectSortOption; label: string }[] = [
    { value: 'newest', label: t.projectsCatalog.sortNewest },
    { value: 'oldest', label: t.projectsCatalog.sortOldest },
    { value: 'name', label: t.projectsCatalog.sortName },
  ]

  return (
    <div className="space-y-4">
      <FilterSelect
        id={`${idPrefix}-category`}
        label={t.projectsCatalog.category}
        value={filters.category}
        onChange={(v) => onFilterChange('category', v)}
      >
        <option value="">{t.projectsCatalog.allCategories}</option>
        {projectCategories.map((category) => (
          <option key={category.id} value={category.slug}>
            {pickLocalized(category, 'name', locale)}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        id={`${idPrefix}-location`}
        label={t.projectsCatalog.location}
        value={filters.location}
        onChange={(v) => onFilterChange('location', v)}
      >
        <option value="">{t.projectsCatalog.allLocations}</option>
        {locationOptions.map((location) => (
          <option key={location.value} value={location.value}>
            {locale === 'ar' ? location.labelAr : location.labelEn}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        id={`${idPrefix}-featured`}
        label={t.projectsCatalog.featuredFilter}
        value={filters.featured}
        onChange={(v) => onFilterChange('featured', v)}
      >
        <option value="">{t.projectsCatalog.any}</option>
        <option value="true">{t.projectsCatalog.featuredOnly}</option>
        <option value="false">{t.projectsCatalog.notFeatured}</option>
      </FilterSelect>

      {showSort && (
        <FilterSelect
          id={`${idPrefix}-sort`}
          label={t.projectsCatalog.sortBy}
          value={filters.sort}
          onChange={(v) => onFilterChange('sort', v as ProjectSortOption)}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </FilterSelect>
      )}

      <button
        type="button"
        onClick={onClearFilters}
        className="w-full rounded-lg border border-surface-200 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-brand-yellow/50 hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
      >
        {t.projectsCatalog.clearFilters}
      </button>
    </div>
  )
}
