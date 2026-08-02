import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import type { Project } from '@/types'
import { DirectionalArrow, ImageWithFallback } from '@/components/common'
import { ROUTES } from '@/routes/paths'
import { formatDate, pickLocalized, pickProjectTitle, useTranslation } from '@/utils'

const PLACEHOLDER_PATTERN = /placeholder/i

function isPlaceholderImage(src: string): boolean {
  return PLACEHOLDER_PATTERN.test(src)
}

interface HomeProjectCardProps {
  project: Project
}

export function HomeProjectCard({ project }: HomeProjectCardProps) {
  const { t, locale } = useTranslation()
  const reducedMotion = useReducedMotion() ?? false
  const title = pickProjectTitle(project, locale)
  const shortDescription = pickLocalized(project, 'shortDescription', locale)
  const hasDescription = Boolean(shortDescription.trim())
  const category = pickLocalized(project, 'categoryName', locale)
  const locationLabel = pickLocalized(project, 'location', locale)
  const hasLocation = Boolean(locationLabel.trim())
  const yearLabel = project.year
    ? String(project.year)
    : project.completionDate
      ? formatDate(project.completionDate, locale)
      : ''
  const hasDate = Boolean(yearLabel)
  const placeholder = isPlaceholderImage(project.coverImage)

  return (
    <Link
      to={ROUTES.projectDetails(project.slug)}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-soft transition-all duration-300 hover:border-brand-yellow/40 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
        reducedMotion ? '' : 'hover:-translate-y-0.5'
      }`}
      aria-label={title}
    >
      <div className="relative h-[13.125rem] overflow-hidden bg-brand-navy sm:h-[15rem] lg:h-[17.5rem]">
        <ImageWithFallback
          src={project.coverImage}
          alt={title}
          className={`size-full transition-transform duration-300 ${
            reducedMotion ? '' : 'group-hover:scale-[1.03]'
          } ${placeholder ? 'object-contain p-8' : 'object-cover'}`}
        />
        {!placeholder && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-navy/70 to-transparent" />
        )}
        <div className="absolute start-3 top-3 flex flex-wrap gap-2">
          {category && (
            <span className="rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-navy shadow-sm">
              {category}
            </span>
          )}
          {project.featured && (
            <span className="rounded-md bg-brand-yellow px-2.5 py-1 text-xs font-semibold text-brand-navy shadow-sm">
              {t.projectsCatalog.featuredBadge}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue sm:text-lg">
          {title}
        </h3>

        {(hasLocation || hasDate) && (
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary sm:text-sm">
            {hasLocation && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5 shrink-0 text-brand-blue" aria-hidden="true" />
                {locationLabel}
              </span>
            )}
            {hasDate && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3.5 shrink-0 text-brand-blue" aria-hidden="true" />
                {yearLabel}
              </span>
            )}
          </div>
        )}

        {hasDescription && (
          <p className="mt-2 line-clamp-2 min-h-[2.5rem] flex-1 text-sm leading-relaxed text-text-secondary">
            {shortDescription}
          </p>
        )}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-blue transition-colors group-hover:text-brand-navy">
          {t.common.viewDetails}
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

export function HomeProjectGridSkeleton({
  count = 4,
  columns = 2,
}: {
  count?: number
  columns?: 2 | 3
}) {
  const gridClass =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <ul className={`grid gap-5 ${gridClass}`}>
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-soft"
        >
          <div className="h-[13.125rem] bg-surface-100 sm:h-[15rem] lg:h-[17.5rem]" />
          <div className="space-y-3 p-4 sm:p-5">
            <div className="h-5 w-4/5 rounded bg-surface-100" />
            <div className="h-4 w-1/2 rounded bg-surface-100" />
            <div className="h-4 w-full rounded bg-surface-100" />
            <div className="h-4 w-5/6 rounded bg-surface-100" />
            <div className="h-4 w-28 rounded bg-surface-100" />
          </div>
        </li>
      ))}
    </ul>
  )
}
