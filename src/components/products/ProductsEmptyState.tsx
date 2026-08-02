import { PackageOpen } from 'lucide-react'
import { useTranslation } from '@/utils'

interface ProductsEmptyStateProps {
  onClearFilters: () => void
}

export function ProductsEmptyState({ onClearFilters }: ProductsEmptyStateProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center rounded-xl border border-surface-200 bg-white px-6 py-16 text-center shadow-soft">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-surface-100">
        <PackageOpen className="size-8 text-text-muted" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-bold text-brand-navy">{t.catalog.emptyTitle}</h2>
      <p className="mt-2 max-w-md text-sm text-text-secondary">{t.catalog.emptyDescription}</p>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-6 rounded-lg gradient-accent px-6 py-2.5 text-sm font-semibold text-brand-navy transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
      >
        {t.catalog.clearFilters}
      </button>
    </div>
  )
}
