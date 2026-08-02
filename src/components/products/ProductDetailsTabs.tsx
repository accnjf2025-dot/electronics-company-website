import { useState, type KeyboardEvent, type ReactNode } from 'react'
import type { Product } from '@/types'
import { companyProfile } from '@/data/company'
import { pickLocalized, useTranslation } from '@/utils'

interface ProductDetailsTabsProps {
  product: Product
}

type TabId = 'description' | 'specifications' | 'features' | 'delivery' | 'warranty'

interface TabConfig {
  id: TabId
  label: string
  visible: boolean
}

export function ProductDetailsTabs({ product }: ProductDetailsTabsProps) {
  const { t, locale } = useTranslation()

  const tabs: TabConfig[] = (
    [
      {
        id: 'description' as const,
        label: t.catalog.tabs.description,
        visible: Boolean(pickLocalized(product, 'fullDescription', locale)),
      },
      {
        id: 'specifications' as const,
        label: t.catalog.tabs.specifications,
        visible: product.specifications.length > 0,
      },
      {
        id: 'features' as const,
        label: t.catalog.tabs.features,
        visible: product.features.length > 0,
      },
      {
        id: 'delivery' as const,
        label: t.catalog.tabs.delivery,
        visible: Boolean(product.deliveryAvailable || product.installationAvailable),
      },
      {
        id: 'warranty' as const,
        label: t.catalog.tabs.warranty,
        visible: Boolean(
          product.warrantyAvailable || product.afterSalesSupport || product.installmentAvailable,
        ),
      },
    ] satisfies TabConfig[]
  ).filter((tab) => tab.visible)

  const [activeTab, setActiveTab] = useState<TabId>(tabs[0]?.id ?? 'description')
  const currentTab = tabs.some((tab) => tab.id === activeTab)
    ? activeTab
    : (tabs[0]?.id ?? 'description')

  if (tabs.length === 0) return null

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const direction = e.key === 'ArrowRight' ? 1 : -1
      const rtlMultiplier = locale === 'ar' ? -1 : 1
      const nextIndex = (index + direction * rtlMultiplier + tabs.length) % tabs.length
      const nextTab = tabs[nextIndex]
      if (nextTab) setActiveTab(nextTab.id)
    }
  }

  const renderPanel = (tabId: TabId): ReactNode => {
    switch (tabId) {
      case 'description':
        return (
          <p className="leading-relaxed text-text-secondary">
            {pickLocalized(product, 'fullDescription', locale)}
          </p>
        )
      case 'specifications':
        return (
          <dl className="divide-y divide-surface-200 rounded-xl border border-surface-200">
            {product.specifications.map((spec) => (
              <div
                key={spec.labelEn}
                className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <dt className="text-sm font-medium text-brand-navy">
                  {pickLocalized(spec, 'label', locale)}
                </dt>
                <dd className="text-sm text-text-secondary">
                  {pickLocalized(spec, 'value', locale)}
                </dd>
              </div>
            ))}
          </dl>
        )
      case 'features':
        return (
          <ul className="space-y-4">
            {product.features.map((feature) => (
              <li key={feature.titleEn}>
                <h4 className="font-semibold text-brand-navy">
                  {pickLocalized(feature, 'title', locale)}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  {pickLocalized(feature, 'description', locale)}
                </p>
              </li>
            ))}
          </ul>
        )
      case 'delivery':
        return (
          <ul className="space-y-3 text-sm leading-relaxed text-text-secondary">
            {product.deliveryAvailable && <li>{t.catalog.services.deliveryDesc}</li>}
            {product.installationAvailable && (
              <li>
                {pickLocalized(product, 'installationArea', locale) ||
                  t.catalog.services.installationDesc}
              </li>
            )}
          </ul>
        )
      case 'warranty':
        return (
          <ul className="space-y-3 text-sm leading-relaxed text-text-secondary">
            {product.warrantyAvailable && (
              <li>
                {pickLocalized(product, 'warrantyText', locale) || t.common.warranty}
              </li>
            )}
            {product.afterSalesSupport && <li>{t.catalog.services.afterSalesDesc}</li>}
            {product.installmentAvailable && (
              <li>
                {t.catalog.services.installmentDesc}{' '}
                <a
                  href={product.installmentUrl ?? companyProfile.links.gini}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-blue hover:text-brand-navy"
                >
                  {t.common.installmentCta}
                </a>
              </li>
            )}
          </ul>
        )
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={t.catalog.tabs.description}
        className="flex gap-1 overflow-x-auto border-b border-surface-200 pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={currentTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={currentTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
              currentTab === tab.id
                ? 'border-brand-yellow text-brand-navy'
                : 'border-transparent text-text-secondary hover:text-brand-navy'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={currentTab !== tab.id}
          tabIndex={0}
          className="py-6 focus-visible:outline-none"
        >
          {renderPanel(tab.id)}
        </div>
      ))}
    </div>
  )
}
