import type { ReactNode } from 'react'
import type { ProductFilterState } from '@/utils/products'
import type { SortOption } from '@/utils/products'
import { useTranslation } from '@/utils'

interface ProductsFiltersProps {
  filters: ProductFilterState
  brands: string[]
  onFilterChange: <K extends keyof ProductFilterState>(
    key: K,
    value: ProductFilterState[K],
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

function YesNoAnySelect({
  id,
  label,
  value,
  onChange,
  anyLabel,
  yesLabel,
  noLabel,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  anyLabel: string
  yesLabel: string
  noLabel: string
}) {
  return (
    <FilterSelect id={id} label={label} value={value} onChange={onChange}>
      <option value="">{anyLabel}</option>
      <option value="yes">{yesLabel}</option>
      <option value="no">{noLabel}</option>
    </FilterSelect>
  )
}

export function ProductsFilters({
  filters,
  brands,
  onFilterChange,
  onClearFilters,
  showSort = false,
  idPrefix = 'filter',
}: ProductsFiltersProps) {
  const { t } = useTranslation()

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: t.catalog.sortNewest },
    { value: 'price-asc', label: t.catalog.sortPriceAsc },
    { value: 'price-desc', label: t.catalog.sortPriceDesc },
    { value: 'name', label: t.catalog.sortName },
  ]

  return (
    <div className="space-y-4">
      <YesNoAnySelect
        id={`${idPrefix}-warranty`}
        label={t.catalog.warrantyFilter}
        value={filters.warranty}
        onChange={(v) => onFilterChange('warranty', v)}
        anyLabel={t.catalog.any}
        yesLabel={t.catalog.yes}
        noLabel={t.catalog.no}
      />

      <YesNoAnySelect
        id={`${idPrefix}-installation`}
        label={t.catalog.installationFilter}
        value={filters.installation}
        onChange={(v) => onFilterChange('installation', v)}
        anyLabel={t.catalog.any}
        yesLabel={t.catalog.yes}
        noLabel={t.catalog.no}
      />

      <YesNoAnySelect
        id={`${idPrefix}-installment`}
        label={t.catalog.installmentFilter}
        value={filters.installment}
        onChange={(v) => onFilterChange('installment', v)}
        anyLabel={t.catalog.any}
        yesLabel={t.catalog.yes}
        noLabel={t.catalog.no}
      />

      <FilterSelect
        id={`${idPrefix}-brand`}
        label={t.catalog.brand}
        value={filters.brand}
        onChange={(v) => onFilterChange('brand', v)}
      >
        <option value="">{t.catalog.allBrands}</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        id={`${idPrefix}-availability`}
        label={t.catalog.availability}
        value={filters.availability}
        onChange={(v) => onFilterChange('availability', v)}
      >
        <option value="">{t.catalog.any}</option>
        <option value="in_stock">{t.common.inStock}</option>
        <option value="pre_order">{t.common.preOrder}</option>
        <option value="out_of_stock">{t.common.outOfStock}</option>
      </FilterSelect>

      {showSort && (
        <FilterSelect
          id={`${idPrefix}-sort`}
          label={t.catalog.sortBy}
          value={filters.sort}
          onChange={(v) => onFilterChange('sort', v as SortOption)}
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
        {t.catalog.clearFilters}
      </button>
    </div>
  )
}
