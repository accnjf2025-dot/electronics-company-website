interface ProjectsErrorStateProps {
  title: string
  description?: string
  retryLabel: string
  onRetry: () => void
}

export function ProjectsErrorState({
  title,
  description,
  retryLabel,
  onRetry,
}: ProjectsErrorStateProps) {
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

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index} className="w-full max-w-[420px] animate-pulse rounded-xl border border-surface-200 bg-white shadow-soft">
          <div className="aspect-video rounded-t-xl bg-surface-100" />
          <div className="p-5">
            <div className="h-5 w-24 rounded bg-surface-100" />
            <div className="mt-3 h-6 w-4/5 rounded bg-surface-100" />
            <div className="mt-2 h-4 w-1/2 rounded bg-surface-100" />
            <div className="mt-3 h-4 w-full rounded bg-surface-100" />
            <div className="mt-2 h-4 w-5/6 rounded bg-surface-100" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ProjectDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse overflow-hidden rounded-xl border border-surface-200 bg-white shadow-soft">
        <div className="aspect-[2.4/1] max-h-[280px] bg-surface-100" />
        <div className="space-y-4 p-7">
          <div className="h-5 w-24 rounded bg-surface-100" />
          <div className="h-8 w-2/3 rounded bg-surface-100" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-16 rounded-lg bg-surface-100" />
            ))}
          </div>
        </div>
      </div>
      <div className="animate-pulse rounded-xl border border-surface-200 bg-white p-6 shadow-soft">
        <div className="h-6 w-40 rounded bg-surface-100" />
        <div className="mt-4 h-4 w-full rounded bg-surface-100" />
        <div className="mt-2 h-4 w-5/6 rounded bg-surface-100" />
      </div>
    </div>
  )
}

export function ProjectFiltersSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index}>
          <div className="mb-2 h-4 w-24 rounded bg-surface-100" />
          <div className="h-10 w-full rounded-lg bg-surface-100" />
        </div>
      ))}
    </div>
  )
}
