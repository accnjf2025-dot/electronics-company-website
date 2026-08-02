interface ProductsErrorStateProps {
  title: string
  description?: string
  retryLabel: string
  onRetry: () => void
}

export function ProductsErrorState({
  title,
  description,
  retryLabel,
  onRetry,
}: ProductsErrorStateProps) {
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

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className="w-full animate-pulse overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-soft"
        >
          <div className="h-[11.875rem] bg-surface-100 sm:h-[13.125rem] lg:h-[15rem]" />
          <div className="space-y-3 p-4 sm:p-5">
            <div className="flex gap-2">
              <div className="h-5 w-16 rounded-full bg-surface-100" />
              <div className="h-5 w-14 rounded-full bg-surface-100" />
            </div>
            <div className="h-3 w-20 rounded bg-surface-100" />
            <div className="h-5 w-4/5 rounded bg-surface-100" />
            <div className="h-4 w-full rounded bg-surface-100" />
            <div className="h-4 w-5/6 rounded bg-surface-100" />
            <div className="h-6 w-1/3 rounded bg-surface-100" />
            <div className="h-10 w-full rounded-lg bg-surface-100" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function CategoryGridSkeleton({ count = 7 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className="min-h-[15.5rem] animate-pulse rounded-2xl border border-surface-200 bg-white p-5 shadow-soft sm:min-h-[16.5rem] sm:p-6"
        >
          <div className="mb-4 h-[5.5rem] rounded-xl bg-surface-100 sm:h-[6rem]" />
          <div className="h-5 w-3/4 rounded bg-surface-100" />
          <div className="mt-3 h-4 w-full rounded bg-surface-100" />
          <div className="mt-2 h-4 w-5/6 rounded bg-surface-100" />
          <div className="mt-6 h-4 w-24 rounded bg-surface-100" />
        </li>
      ))}
    </ul>
  )
}

export function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
      <div className="animate-pulse rounded-xl border border-surface-200 bg-white p-4 shadow-soft">
        <div className="aspect-square rounded-lg bg-surface-100" />
        <div className="mt-3 flex gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="size-16 rounded-lg bg-surface-100" />
          ))}
        </div>
      </div>
      <div className="animate-pulse space-y-4 rounded-xl border border-surface-200 bg-white p-6 shadow-soft">
        <div className="h-8 w-2/3 rounded bg-surface-100" />
        <div className="h-6 w-1/3 rounded bg-surface-100" />
        <div className="h-4 w-full rounded bg-surface-100" />
        <div className="h-4 w-5/6 rounded bg-surface-100" />
        <div className="h-10 w-full rounded bg-surface-100" />
        <div className="h-10 w-full rounded bg-surface-100" />
      </div>
    </div>
  )
}

export function CategoryNavSkeleton() {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-10 w-28 animate-pulse rounded-full bg-surface-100" />
      ))}
    </div>
  )
}
