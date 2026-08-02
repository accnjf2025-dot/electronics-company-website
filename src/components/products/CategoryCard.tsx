import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { ImageWithFallback, DirectionalArrow } from '@/components/common'
import type { ProductCategory } from '@/types'
import { ROUTES } from '@/routes/paths'
import { pickLocalized, useTranslation } from '@/utils'

interface CategoryCardProps {
  category: ProductCategory & { productCount?: number }
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { t, locale } = useTranslation()
  const reducedMotion = useReducedMotion() ?? false
  const Icon = category.icon
  const name = pickLocalized(category, 'name', locale)
  const description = pickLocalized(category, 'description', locale)
  const hasDescription = Boolean(description.trim())
  const hasCount = typeof category.productCount === 'number' && category.productCount > 0

  return (
    <Link
      to={`${ROUTES.products}?category=${category.slug}`}
      className={`group flex h-full min-h-[15.5rem] flex-col rounded-2xl border border-surface-200 bg-white p-5 shadow-soft transition-all duration-300 hover:border-brand-yellow/45 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow sm:min-h-[16.5rem] sm:p-6 ${
        reducedMotion ? '' : 'hover:-translate-y-0.5'
      }`}
      aria-label={name}
    >
      <div className="mb-4 flex h-[5.5rem] items-center justify-center rounded-xl border border-surface-100 bg-gradient-to-br from-surface-50 via-white to-brand-yellow/[0.07] sm:h-[6rem]">
        {category.image ? (
          <ImageWithFallback
            src={category.image}
            alt=""
            className={`max-h-[3.75rem] max-w-[4.5rem] object-contain transition-transform duration-300 sm:max-h-[4.25rem] sm:max-w-[5rem] ${
              reducedMotion ? '' : 'group-hover:scale-105'
            }`}
          />
        ) : (
          <div
            className={`flex size-16 items-center justify-center rounded-xl bg-brand-yellow text-brand-navy shadow-sm transition-transform duration-300 sm:size-[4.5rem] ${
              reducedMotion ? '' : 'group-hover:scale-105'
            }`}
          >
            <Icon className="size-8 sm:size-9" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-brand-navy sm:text-lg">{name}</h3>

        {hasDescription && (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-text-secondary">{description}</p>
        )}

        {hasCount && (
          <p className="mt-2 text-xs font-medium text-brand-blue">
            {category.productCount}{' '}
            {locale === 'ar' ? 'منتج' : category.productCount === 1 ? 'product' : 'products'}
          </p>
        )}

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors group-hover:text-brand-navy">
          {t.common.explore}
          <DirectionalArrow
            className={`size-4 text-brand-yellow transition-transform ${
              reducedMotion ? '' : 'group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5'
            }`}
          />
        </span>
      </div>
    </Link>
  )
}
