import { Link } from 'react-router-dom'
import { CreditCard, Shield, Truck, Wrench } from 'lucide-react'
import type { Product, AvailabilityStatus } from '@/types'
import { getCategoryById } from '@/data'
import { ROUTES } from '@/routes/paths'
import { formatPrice, pickLocalized, useTranslation } from '@/utils'
import { getAvailabilityLabelKey } from '@/utils/products'
import { DirectionalArrow, ImageWithFallback } from '@/components/common'

interface ProductCardProps {
  product: Product
}

function getAvailabilityStyles(status: AvailabilityStatus) {
  switch (status) {
    case 'in_stock':
      return 'bg-emerald-50 text-emerald-700'
    case 'out_of_stock':
      return 'bg-red-50 text-red-600'
    case 'pre_order':
      return 'bg-amber-50 text-amber-700'
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, locale } = useTranslation()
  const category = getCategoryById(product.categoryId)
  const imageSrc = product.images[0] ?? '/images/placeholder.svg'
  const name = pickLocalized(product, 'name', locale)
  const shortDescription = pickLocalized(product, 'shortDescription', locale)
  const availabilityKey = getAvailabilityLabelKey(product.availability)
  const availabilityLabel = t.common[availabilityKey]

  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-surface-200 bg-white shadow-soft transition-shadow duration-300 hover:border-brand-yellow/30 hover:shadow-card">
      <Link
        to={ROUTES.productDetails(product.slug)}
        className="relative block h-44 overflow-hidden bg-surface-100 sm:h-48 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
      >
        <ImageWithFallback
          src={imageSrc}
          alt={name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {product.featured && (
          <span className="absolute start-3 top-3 rounded-md bg-brand-yellow px-2.5 py-1 text-xs font-semibold text-brand-navy">
            {t.common.featured}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
          {category && (
            <span className="font-medium text-brand-blue">
              {pickLocalized(category, 'name', locale)}
            </span>
          )}
          <span className="text-text-muted" aria-hidden="true">
            •
          </span>
          <span className="text-text-muted">{product.brand}</span>
        </div>

        <Link
          to={ROUTES.productDetails(product.slug)}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        >
          <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue md:text-lg">
            {name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-text-secondary">
          {shortDescription}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getAvailabilityStyles(product.availability)}`}
          >
            {availabilityLabel}
          </span>
          <div className="flex items-center gap-2 text-text-muted">
            {product.deliveryAvailable && (
              <span title={t.common.deliveryAvailable} className="inline-flex">
                <Truck className="size-3.5" aria-label={t.common.deliveryAvailable} />
              </span>
            )}
            {product.installationAvailable && (
              <span title={t.common.installationAvailable} className="inline-flex">
                <Wrench className="size-3.5" aria-label={t.common.installationAvailable} />
              </span>
            )}
            {product.warrantyAvailable && (
              <span title={t.common.warranty} className="inline-flex">
                <Shield className="size-3.5" aria-label={t.common.warranty} />
              </span>
            )}
            {product.installmentAvailable && (
              <span
                title={t.catalog.installmentBadge}
                className="inline-flex items-center gap-0.5 rounded bg-brand-yellow/15 px-1.5 py-0.5 text-[10px] font-semibold text-brand-navy"
              >
                <CreditCard className="size-3" aria-hidden="true" />
                {t.catalog.installmentBadge}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto space-y-3 pt-4">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-lg font-bold text-brand-navy">
              {formatPrice(product.price, product.currency, locale)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-text-muted line-through">
                {formatPrice(product.oldPrice, product.currency, locale)}
              </span>
            )}
          </div>

          <Link
            to={ROUTES.productDetails(product.slug)}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-surface-200 px-4 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-yellow/50 hover:bg-brand-yellow/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            {t.common.viewDetails}
            <DirectionalArrow className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
