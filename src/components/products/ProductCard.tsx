import { Link } from 'react-router-dom'
import { CreditCard, Shield, Truck, Wrench } from 'lucide-react'
import type { Product, AvailabilityStatus } from '@/types'
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
  const imageSrc = product.images[0] ?? '/images/placeholder.svg'
  const name = pickLocalized(product, 'name', locale)
  const shortDescription = pickLocalized(product, 'shortDescription', locale)
  const hasDescription = Boolean(shortDescription.trim())
  const hasPrice = product.price > 0
  const availabilityKey = getAvailabilityLabelKey(product.availability)
  const availabilityLabel = t.common[availabilityKey]

  return (
    <Link
      to={ROUTES.productDetails(product.slug)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-soft transition-all duration-300 hover:border-brand-yellow/40 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
      aria-label={name}
    >
      <div className="relative flex h-[11.875rem] items-center justify-center bg-gradient-to-b from-surface-50 to-white p-5 sm:h-[13.125rem] lg:h-[15rem]">
        <ImageWithFallback
          src={imageSrc}
          alt={name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.featured && (
          <span className="absolute start-3 top-3 rounded-md bg-brand-yellow px-2.5 py-1 text-xs font-semibold text-brand-navy">
            {t.common.featured}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex min-h-[1.75rem] flex-wrap items-center gap-1.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getAvailabilityStyles(product.availability)}`}
          >
            {availabilityLabel}
          </span>
          {product.installmentAvailable && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-brand-yellow/15 px-2 py-0.5 text-[10px] font-semibold text-brand-navy">
              <CreditCard className="size-3" aria-hidden="true" />
              {t.catalog.installmentBadge}
            </span>
          )}
          <div className="ms-auto flex items-center gap-1.5 text-text-muted">
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
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">{product.brand}</p>

        <h3 className="mt-1.5 line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue md:text-lg">
          {name}
        </h3>

        {hasDescription && (
          <p className="mt-2 line-clamp-2 min-h-[2.5rem] flex-1 text-sm leading-relaxed text-text-secondary">
            {shortDescription}
          </p>
        )}

        <div className={`mt-auto space-y-3 ${hasDescription ? 'pt-4' : 'pt-3'}`}>
          {hasPrice && (
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-lg font-bold text-brand-navy">
                {formatPrice(product.price, product.currency, locale)}
              </span>
              {product.oldPrice && product.oldPrice > 0 && (
                <span className="text-sm text-text-muted line-through">
                  {formatPrice(product.oldPrice, product.currency, locale)}
                </span>
              )}
            </div>
          )}

          <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-surface-200 bg-surface-50 px-4 py-2.5 text-sm font-semibold text-brand-navy transition-colors group-hover:border-brand-yellow/50 group-hover:bg-brand-yellow/10">
            {t.common.viewDetails}
            <DirectionalArrow className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
