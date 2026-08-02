import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { DirectionalArrow } from './DirectionalArrow'

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  actionLabel?: string
  actionTo?: string
  align?: 'start' | 'center'
  light?: boolean
  children?: ReactNode
}

export function SectionHeader({
  label,
  title,
  subtitle,
  actionLabel,
  actionTo,
  align = 'start',
  light = false,
  children,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-start'
  const titleColor = light ? 'text-white' : 'text-brand-navy'
  const subtitleColor = light ? 'text-white/70' : 'text-text-secondary'
  const labelColor = light ? 'text-brand-yellow' : 'text-brand-blue'

  return (
    <div
      className={`mb-10 md:mb-12 ${alignClass} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}
    >
      <div
        className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
          align === 'center' ? 'sm:flex-col sm:items-center' : ''
        }`}
      >
        <div className={alignClass}>
          {label && (
            <span
              className={`mb-3 inline-block text-sm font-semibold tracking-wide ${labelColor}`}
            >
              {label}
            </span>
          )}
          <h2 className={`text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl ${titleColor}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`mt-3 text-base leading-relaxed md:text-lg ${subtitleColor}`}>
              {subtitle}
            </p>
          )}
        </div>

        {actionLabel && actionTo && (
          <Link
            to={actionTo}
            className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold transition-colors ${
              light
                ? 'text-brand-yellow hover:text-white'
                : 'text-brand-blue hover:text-brand-navy'
            }`}
          >
            {actionLabel}
            <DirectionalArrow className="size-4" />
          </Link>
        )}
      </div>
      {children}
    </div>
  )
}
