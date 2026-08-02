import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { ProductFilterState } from '@/utils/products'
import { useTranslation } from '@/utils'
import { ProductsFilters } from './ProductsFilters'

interface ProductsFilterDrawerProps {
  open: boolean
  filters: ProductFilterState
  brands: string[]
  onClose: () => void
  onFilterChange: <K extends keyof ProductFilterState>(
    key: K,
    value: ProductFilterState[K],
  ) => void
  onClearFilters: () => void
  onApply: () => void
}

export function ProductsFilterDrawer({
  open,
  filters,
  brands,
  onClose,
  onFilterChange,
  onClearFilters,
  onApply,
}: ProductsFilterDrawerProps) {
  const { t } = useTranslation()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    panelRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
      <button
        type="button"
        aria-label={t.catalog.closeFilters}
        className="absolute inset-0 bg-brand-navy/50"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.catalog.filters}
        tabIndex={-1}
        className="absolute inset-y-0 end-0 flex w-full max-w-sm flex-col bg-white shadow-elevated max-h-dvh"
      >
        <div className="flex items-center justify-between border-b border-surface-200 px-5 py-4">
          <h2 className="text-lg font-bold text-brand-navy">{t.catalog.filters}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.catalog.closeFilters}
            className="flex size-9 items-center justify-center rounded-lg text-brand-navy transition-colors hover:bg-surface-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          <ProductsFilters
            filters={filters}
            brands={brands}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            idPrefix="drawer"
          />
        </div>

        <div className="shrink-0 border-t border-surface-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => {
              onApply()
              onClose()
            }}
            className="w-full rounded-lg btn-gini py-2.5 text-sm font-semibold text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            {t.catalog.applyFilters}
          </button>
        </div>
      </div>
    </div>
  )
}
