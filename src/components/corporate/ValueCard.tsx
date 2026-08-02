import type { LucideIcon } from 'lucide-react'

interface ValueCardProps {
  icon: LucideIcon
  title: string
  description: string
  variant?: 'default' | 'navy'
}

export function ValueCard({ icon: Icon, title, description, variant = 'default' }: ValueCardProps) {
  return (
    <article
      className={`h-full rounded-xl border p-5 shadow-soft ${
        variant === 'navy'
          ? 'border-brand-navy/20 bg-brand-navy text-white'
          : 'border-surface-200 bg-surface-50'
      }`}
    >
      <div
        className={`mb-3 flex size-10 items-center justify-center rounded-lg ${
          variant === 'navy' ? 'bg-brand-yellow text-brand-navy' : 'bg-brand-yellow/15 text-brand-navy'
        }`}
      >
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className={`font-semibold ${variant === 'navy' ? 'text-white' : 'text-brand-navy'}`}>{title}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${variant === 'navy' ? 'text-white/75' : 'text-text-secondary'}`}>
        {description}
      </p>
    </article>
  )
}
