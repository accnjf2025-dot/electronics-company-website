import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import type { Service } from '@/types/service'
import { DirectionalArrow } from '@/components/common'
import { ROUTES } from '@/routes/paths'
import { pickLocalized, useTranslation } from '@/utils'

const PLACEHOLDER_PATTERN = /placeholder/i

function hasValidCover(src?: string): boolean {
  return Boolean(src?.trim()) && !PLACEHOLDER_PATTERN.test(src ?? '')
}

interface HomeServiceCardProps {
  service: Service
}

function ServiceVisual({ service, title }: { service: Service; title: string }) {
  const Icon = service.icon
  const cover = service.coverImage

  if (hasValidCover(cover)) {
    return (
      <div className="relative h-[9.375rem] overflow-hidden sm:h-[10.625rem] lg:h-[13.125rem]">
        <img
          src={cover}
          alt=""
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/35 to-brand-navy/20" />
        <div className="absolute bottom-3 start-3 flex size-11 items-center justify-center rounded-lg bg-brand-yellow text-brand-navy shadow-md">
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-[9.375rem] items-center justify-center overflow-hidden gradient-navy sm:h-[10.625rem] lg:h-[13.125rem]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,196,0,0.12),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="relative flex size-16 items-center justify-center rounded-2xl bg-brand-yellow text-brand-navy shadow-elevated transition-transform duration-300 group-hover:scale-105 sm:size-[4.5rem]">
        <Icon className="size-8 sm:size-9" aria-hidden="true" />
      </div>
      <span className="sr-only">{title}</span>
    </div>
  )
}

export function HomeServiceCard({ service }: HomeServiceCardProps) {
  const { t, locale } = useTranslation()
  const reducedMotion = useReducedMotion() ?? false
  const title = pickLocalized(service, 'title', locale)
  const description = pickLocalized(service, 'description', locale)
  const hasDescription = Boolean(description.trim())
  const features = (locale === 'ar' ? service.includesAr : service.includesEn).slice(0, 3)

  return (
    <Link
      to={ROUTES.services}
      className={`group flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-soft transition-all duration-300 hover:border-brand-yellow/45 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow sm:min-h-[23rem] ${
        reducedMotion ? '' : 'hover:-translate-y-0.5'
      }`}
      aria-label={title}
    >
      <ServiceVisual service={service} title={title} />
      <div className="h-1 bg-brand-yellow" aria-hidden="true" />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-brand-navy sm:text-lg">{title}</h3>

        {hasDescription && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">{description}</p>
        )}

        {features.length > 0 && (
          <ul className={`space-y-1.5 ${hasDescription ? 'mt-3' : 'mt-2'}`}>
            {features.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-text-primary sm:text-sm">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-brand-yellow" aria-hidden="true" />
                <span className="line-clamp-2">{item}</span>
              </li>
            ))}
          </ul>
        )}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-blue transition-colors group-hover:text-brand-navy">
          {t.common.learnMore}
          <DirectionalArrow
            className={`size-4 text-brand-yellow transition-transform ${
              reducedMotion ? '' : 'group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5'
            }`}
          />
        </span>
      </div>
    </Link>
  )
}

export function HomeServiceGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className="min-h-[22rem] animate-pulse overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-soft sm:min-h-[23rem]"
        >
          <div className="h-[9.375rem] bg-surface-100 sm:h-[10.625rem] lg:h-[13.125rem]" />
          <div className="h-1 bg-surface-100" />
          <div className="space-y-3 p-4 sm:p-5">
            <div className="h-5 w-4/5 rounded bg-surface-100" />
            <div className="h-4 w-full rounded bg-surface-100" />
            <div className="h-4 w-5/6 rounded bg-surface-100" />
            <div className="mt-4 h-4 w-28 rounded bg-surface-100" />
          </div>
        </li>
      ))}
    </ul>
  )
}
