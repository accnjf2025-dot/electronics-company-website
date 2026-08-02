import type { Product } from '@/types'
import { getCategoryById } from '@/data'
import { companyProfile } from '@/data/company'
import { formatPrice, pickLocalized, useTranslation } from '@/utils'
import { buildWhatsAppInquiryUrl, getAvailabilityLabelKey } from '@/utils/products'

interface ProductInfoProps {
  product: Product
  pageUrl: string
  compact?: boolean
}

function getAvailabilityStyles(status: Product['availability']) {
  switch (status) {
    case 'in_stock':
      return 'bg-emerald-50 text-emerald-700'
    case 'out_of_stock':
      return 'bg-red-50 text-red-600'
    case 'pre_order':
      return 'bg-amber-50 text-amber-700'
  }
}

export function ProductInfo({ product, pageUrl, compact = false }: ProductInfoProps) {
  const { t, locale } = useTranslation()
  const category = getCategoryById(product.categoryId)
  const name = pickLocalized(product, 'name', locale)
  const shortDescription = pickLocalized(product, 'shortDescription', locale)
  const availabilityKey = getAvailabilityLabelKey(product.availability)
  const whatsappUrl = buildWhatsAppInquiryUrl(product, locale, pageUrl)
  const giniUrl = product.installmentUrl ?? companyProfile.links.gini
  const canPurchase = product.availability !== 'out_of_stock'

  const actions = (
    <div className={`flex flex-col gap-3 ${compact ? '' : 'mt-6'}`}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        {t.catalog.askWhatsapp}
      </a>
      {canPurchase && product.installmentAvailable && (
        <a
          href={giniUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg btn-gini px-5 py-3 text-sm font-semibold text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        >
          {t.common.installmentCta}
        </a>
      )}
    </div>
  )

  if (compact) {
    return actions
  }

  return (
    <div className="flex min-w-0 flex-col">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
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

      <h1 className="text-2xl font-bold leading-tight text-brand-navy md:text-3xl">{name}</h1>

      <div className="mt-2.5 flex flex-wrap items-center gap-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getAvailabilityStyles(product.availability)}`}
        >
          {t.common[availabilityKey]}
        </span>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-xl font-bold text-brand-navy md:text-2xl">
            {formatPrice(product.price, product.currency, locale)}
          </span>
          {product.oldPrice && (
            <span className="text-base text-text-muted line-through">
              {formatPrice(product.oldPrice, product.currency, locale)}
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">{shortDescription}</p>

      {product.features.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {product.features.slice(0, 3).map((feature) => (
            <li
              key={feature.titleEn}
              className="flex items-start gap-2 text-sm text-text-secondary"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-yellow" aria-hidden="true" />
              <span>{pickLocalized(feature, 'title', locale)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="hidden md:block">{actions}</div>
    </div>
  )
}
