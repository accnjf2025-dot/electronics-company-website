import { Link } from 'react-router-dom'
import { Calendar, MapPin } from 'lucide-react'
import type { Project } from '@/types'
import { ROUTES } from '@/routes/paths'
import { formatDate, pickLocalized, useTranslation } from '@/utils'
import { DirectionalArrow, ImageWithFallback } from '@/components/common'

interface ProjectCardProps {
  project: Project
}

function isPlaceholderImage(src: string): boolean {
  return src.includes('placeholder')
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t, locale } = useTranslation()
  const title = pickLocalized(project, 'title', locale)
  const shortDescription = pickLocalized(project, 'shortDescription', locale)
  const category = pickLocalized(project, 'categoryName', locale)
  const locationLabel = pickLocalized(project, 'location', locale)
  const yearLabel = String(project.year || formatDate(project.completionDate, locale))
  const placeholder = isPlaceholderImage(project.coverImage)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-surface-200 bg-white shadow-soft transition-shadow duration-300 hover:border-brand-yellow/30 hover:shadow-card">
      <div className="relative aspect-video overflow-hidden bg-brand-navy">
        <ImageWithFallback
          src={project.coverImage}
          alt={title}
          className={`size-full transition-transform duration-500 group-hover:scale-[1.02] ${
            placeholder ? 'object-contain p-6' : 'object-cover'
          }`}
        />
        {project.featured && (
          <span className="absolute end-3 top-3 rounded-md bg-brand-yellow px-2.5 py-1 text-xs font-semibold text-brand-navy shadow-sm">
            {t.projectsCatalog.featuredBadge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="mb-2 inline-flex w-fit rounded-md bg-brand-yellow/15 px-2.5 py-1 text-xs font-semibold text-brand-navy">
          {category}
        </span>

        <Link
          to={ROUTES.projectDetails(project.slug)}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        >
          <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue md:text-lg">
            {title}
          </h3>
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary sm:text-sm">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5 shrink-0 text-brand-blue" aria-hidden="true" />
            {locationLabel}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5 shrink-0 text-brand-blue" aria-hidden="true" />
            {yearLabel}
          </span>
        </div>

        <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-text-secondary">
          {shortDescription}
        </p>

        <Link
          to={ROUTES.projectDetails(project.slug)}
          className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        >
          {t.common.viewDetails}
          <DirectionalArrow className="size-4" />
        </Link>
      </div>
    </article>
  )
}
