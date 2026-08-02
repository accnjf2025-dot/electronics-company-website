import { Link } from 'react-router-dom'
import type { ProductCategory } from '@/types'
import { ROUTES } from '@/routes/paths'
import { pickLocalized, useTranslation } from '@/utils'
import { DirectionalArrow } from '@/components/common'

interface CategoryCardProps {
  category: ProductCategory
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { t, locale } = useTranslation()
  const Icon = category.icon

  return (
    <Link
      to={`${ROUTES.products}?category=${category.slug}`}
      className="group flex flex-col rounded-xl border border-surface-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow/40 hover:shadow-card"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-brand-yellow/15 text-brand-navy transition-colors group-hover:bg-brand-yellow group-hover:text-brand-navy">
        <Icon className="size-6" aria-hidden="true" />
      </div>

      <h3 className="text-base font-bold text-brand-navy md:text-lg">
        {pickLocalized(category, 'name', locale)}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
        {pickLocalized(category, 'description', locale)}
      </p>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue transition-colors group-hover:text-brand-navy">
        {t.common.explore}
        <DirectionalArrow className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
      </span>
    </Link>
  )
}
