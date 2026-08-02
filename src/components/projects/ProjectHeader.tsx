import { Calendar, Layers, MapPin, User } from 'lucide-react'
import type { Project } from '@/types'
import { formatDate, pickLocalized, useTranslation } from '@/utils'
import { getProjectClientLabel } from '@/utils/projectPortfolio'
import { ImageWithFallback } from '@/components/common'

interface ProjectHeaderProps {
  project: Project
}

function isPlaceholderImage(src: string): boolean {
  return src.includes('placeholder')
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const { t, locale } = useTranslation()
  const title = pickLocalized(project, 'title', locale)
  const category = pickLocalized(project, 'categoryName', locale)
  const location = pickLocalized(project, 'location', locale)
  const client = getProjectClientLabel(project, locale)
  const completion = formatDate(project.completionDate, locale)
  const placeholder = isPlaceholderImage(project.coverImage)

  const metaItems = [
    {
      key: 'type',
      label: t.projectsCatalog.projectType,
      value: category,
      icon: Layers,
    },
    {
      key: 'location',
      label: t.projectsCatalog.locationLabel,
      value: location,
      icon: MapPin,
    },
    {
      key: 'date',
      label: t.projectsCatalog.completionDate,
      value: completion,
      icon: Calendar,
    },
    ...(client
      ? [
          {
            key: 'client',
            label: t.projectsCatalog.clientLabel,
            value: client,
            icon: User,
          },
        ]
      : []),
  ]

  return (
    <article className="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-soft">
      <div className="relative aspect-[2.4/1] max-h-[240px] overflow-hidden bg-brand-navy sm:max-h-[280px]">
        <ImageWithFallback
          src={project.coverImage}
          alt={title}
          className={`size-full ${placeholder ? 'object-contain p-8' : 'object-cover'}`}
        />
        {project.featured && (
          <span className="absolute end-4 top-4 rounded-md bg-brand-yellow px-2.5 py-1 text-xs font-semibold text-brand-navy shadow-sm">
            {t.projectsCatalog.featuredBadge}
          </span>
        )}
      </div>

      <div className="p-5 md:p-7">
        <span className="inline-flex rounded-md bg-brand-yellow/15 px-2.5 py-1 text-xs font-semibold text-brand-navy">
          {category}
        </span>

        <h1 className="mt-3 text-2xl font-bold leading-tight text-brand-navy md:text-3xl">{title}</h1>

        <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metaItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.key}
                className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2.5"
              >
                <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                  <Icon className="size-3.5 shrink-0 text-brand-blue" aria-hidden="true" />
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-medium leading-snug text-brand-navy">{item.value}</dd>
              </div>
            )
          })}
        </dl>
      </div>
    </article>
  )
}
