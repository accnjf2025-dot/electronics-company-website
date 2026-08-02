import { useEffect, useRef } from 'react'
import { productCategories as mockCategories } from '@/data'
import type { ProductCategory } from '@/types'
import { pickLocalized, useTranslation } from '@/utils'
import type { ProductFilterState } from '@/utils/products'

interface CategoryNavProps {
  filters: ProductFilterState
  categories?: ProductCategory[]
  onCategoryChange: (slug: string) => void
}

export function CategoryNav({ filters, categories = mockCategories, onCategoryChange }: CategoryNavProps) {
  const { t, locale } = useTranslation()
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (window.matchMedia('(min-width: 1024px)').matches) return
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [filters.category])

  const pillClass = (isActive: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
      isActive
        ? 'border-brand-yellow bg-brand-yellow text-brand-navy'
        : 'border-surface-200 bg-white text-text-secondary hover:border-brand-yellow/40'
    }`

  return (
    <div className="mb-6 min-w-0">
      <p className="mb-2 text-sm font-medium text-brand-navy">{t.catalog.category}</p>
      <div
        ref={scrollRef}
        role="tablist"
        aria-label={t.catalog.category}
        className="flex flex-wrap gap-2 lg:gap-2.5 max-lg:overflow-x-auto max-lg:flex-nowrap max-lg:pb-1 max-lg:ps-1 max-lg:pe-4 max-lg:[scroll-padding-inline:1rem] max-lg:[-ms-overflow-style:none] max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden"
      >
        <button
          ref={!filters.category ? activeRef : undefined}
          type="button"
          role="tab"
          aria-selected={!filters.category}
          onClick={() => onCategoryChange('')}
          className={`${pillClass(!filters.category)} max-lg:shrink-0`}
        >
          {t.catalog.allCategories}
        </button>
        {categories.map((category) => {
          const isActive = filters.category === category.slug
          return (
            <button
              key={category.id}
              ref={isActive ? activeRef : undefined}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(category.slug)}
              className={`${pillClass(isActive)} max-lg:shrink-0 lg:whitespace-normal`}
            >
              {pickLocalized(category, 'name', locale)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
