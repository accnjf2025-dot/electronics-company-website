import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface InfoPanelProps {
  icon: LucideIcon
  label: string
  children: ReactNode
  variant?: 'default' | 'accent'
}

export function InfoPanel({ icon: Icon, label, children, variant = 'default' }: InfoPanelProps) {
  return (
    <article
      className={`rounded-xl border p-5 shadow-soft md:p-6 ${
        variant === 'accent'
          ? 'border-brand-yellow/30 bg-brand-yellow/5'
          : 'border-surface-200 bg-white'
      }`}
    >
      <div
        className={`mb-3 flex size-10 items-center justify-center rounded-lg ${
          variant === 'accent' ? 'bg-brand-yellow/20 text-brand-navy' : 'bg-brand-yellow/15 text-brand-navy'
        }`}
      >
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="text-sm font-semibold text-text-muted">{label}</h3>
      <div className="mt-2 text-base text-brand-navy">{children}</div>
    </article>
  )
}
