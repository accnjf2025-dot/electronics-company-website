interface CorporateErrorStateProps {
  title: string
  description?: string
  retryLabel: string
  onRetry: () => void
}

export function CorporateErrorState({
  title,
  description,
  retryLabel,
  onRetry,
}: CorporateErrorStateProps) {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-8 text-center shadow-soft">
      <h2 className="text-lg font-bold text-brand-navy">{title}</h2>
      {description && <p className="mt-2 text-sm text-text-secondary">{description}</p>}
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex rounded-lg gradient-accent px-5 py-2.5 text-sm font-semibold text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
      >
        {retryLabel}
      </button>
    </div>
  )
}

export function CorporateSectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-24 rounded-xl bg-surface-100" />
      ))}
    </div>
  )
}

export function CorporateCardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-40 animate-pulse rounded-xl bg-surface-100" />
      ))}
    </div>
  )
}

export function CorporatePartnerGridSkeleton({
  count = 8,
  variant = 'page',
}: {
  count?: number
  variant?: 'homepage' | 'page'
}) {
  const isHomepage = variant === 'homepage'
  return (
    <div
      className={`grid gap-4 sm:gap-5 ${
        isHomepage ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse rounded-2xl border border-surface-200 bg-white shadow-soft ${
            isHomepage ? 'h-[8.5rem] sm:h-[9.5rem]' : 'h-[10.625rem] sm:h-[13.75rem]'
          }`}
        />
      ))}
    </div>
  )
}
