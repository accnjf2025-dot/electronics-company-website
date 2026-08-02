import {
  CreditCard,
  Headphones,
  Shield,
  Truck,
  Wrench,
} from 'lucide-react'
import type { Product } from '@/types'
import { pickLocalized, useTranslation } from '@/utils'

interface ProductServiceHighlightsProps {
  product: Product
}

interface ServiceItem {
  icon: typeof Truck
  title: string
  description: string
}

export function ProductServiceHighlights({ product }: ProductServiceHighlightsProps) {
  const { t, locale } = useTranslation()
  const items: ServiceItem[] = []

  if (product.deliveryAvailable) {
    items.push({
      icon: Truck,
      title: t.catalog.services.deliveryTitle,
      description: t.catalog.services.deliveryDesc,
    })
  }

  if (product.installationAvailable) {
    items.push({
      icon: Wrench,
      title: t.catalog.services.installationTitle,
      description:
        pickLocalized(product, 'installationArea', locale) ||
        t.catalog.services.installationDesc,
    })
  }

  if (product.warrantyAvailable) {
    items.push({
      icon: Shield,
      title: t.catalog.services.warrantyTitle,
      description:
        pickLocalized(product, 'warrantyText', locale) || t.common.warranty,
    })
  }

  if (product.afterSalesSupport) {
    items.push({
      icon: Headphones,
      title: t.catalog.services.afterSalesTitle,
      description: t.catalog.services.afterSalesDesc,
    })
  }

  if (product.installmentAvailable) {
    items.push({
      icon: CreditCard,
      title: t.catalog.services.installmentTitle,
      description: t.catalog.services.installmentDesc,
    })
  }

  if (items.length === 0) return null

  return (
    <div className="grid auto-rows-fr gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.title}
            className="flex h-full gap-3 rounded-xl border border-surface-200 bg-white p-4 shadow-soft"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-yellow/15">
              <Icon className="size-5 text-brand-navy" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-brand-navy">{item.title}</h3>
              <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
