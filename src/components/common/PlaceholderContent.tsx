import type { ReactNode } from 'react'

interface PlaceholderContentProps {
  title: string
  description: string
  children?: ReactNode
}

export function PlaceholderContent({
  title,
  description,
  children,
}: PlaceholderContentProps) {
  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="mx-auto max-w-2xl rounded-xl border border-surface-200 bg-white p-8 text-center shadow-soft md:p-12">
          <h2 className="text-xl font-semibold text-navy-900 md:text-2xl">{title}</h2>
          <p className="mt-4 text-text-secondary">{description}</p>
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  )
}
