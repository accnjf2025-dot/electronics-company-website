import { Link } from 'react-router-dom'
import { Headphones, MapPin, ShieldCheck } from 'lucide-react'
import { useProjectCollageImages } from '@/hooks/api/useProjectCollageImages'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import { ROUTES } from '@/routes/paths'
import { pickProjectTitle, useTranslation } from '@/utils'
import type { Project } from '@/types'
import type { LucideIcon } from 'lucide-react'

function CollageSkeleton() {
  return (
    <div className="grid min-h-[300px] grid-cols-1 gap-3 sm:min-h-[340px] lg:min-h-[380px] lg:grid-cols-[1.85fr_1fr]" aria-hidden="true">
      <div className="animate-pulse rounded-xl bg-surface-100" />
      <div className="animate-pulse rounded-xl bg-surface-100" />
    </div>
  )
}

function ProjectImageTile({
  project,
  locale,
  className,
  priority = false,
  showTitle = false,
}: {
  project: Project
  locale: 'ar' | 'en'
  className?: string
  priority?: boolean
  showTitle?: boolean
}) {
  const title = pickProjectTitle(project, locale)

  return (
    <Link
      to={ROUTES.projectDetails(project.slug)}
      className={`group relative block min-h-0 overflow-hidden rounded-xl border border-surface-200 bg-surface-100 shadow-soft transition-all hover:border-brand-yellow/40 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${className ?? ''}`}
      aria-label={title}
    >
      <img
        src={project.coverImage}
        alt={title}
        className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        loading={priority ? 'eager' : 'lazy'}
      />
      {showTitle && (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-navy/75 to-transparent" />
          <p className="absolute inset-x-0 bottom-0 line-clamp-2 p-3 text-xs font-semibold leading-snug text-white sm:text-sm">
            {title}
          </p>
        </>
      )}
    </Link>
  )
}

function BrandedInfoPanel({
  panelLabel,
  trustPoints,
}: {
  panelLabel: string
  trustPoints: { icon: LucideIcon; label: string }[]
}) {
  const { logoPath, logoAlt } = useCompanyContent()

  return (
    <aside className="flex h-full min-h-[240px] flex-col justify-between rounded-xl border border-surface-200 bg-gradient-to-br from-white via-surface-50 to-brand-navy/[0.04] p-4 shadow-soft sm:min-h-0 sm:p-5">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-xl border border-surface-200 bg-white px-5 py-4 shadow-soft">
          <img
            src={logoPath}
            alt={logoAlt}
            className="h-12 w-auto max-w-[180px] object-contain sm:h-14"
          />
        </div>
        <p className="mt-4 text-sm font-bold leading-snug text-brand-navy sm:text-base">{panelLabel}</p>
      </div>

      <ul className="mt-5 space-y-2.5 border-t border-surface-200 pt-4">
        {trustPoints.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-start gap-2.5 text-xs leading-relaxed text-text-primary sm:text-sm">
            <Icon className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}

function BrandedLogoOnlyPanel({ panelLabel, trustPoints }: { panelLabel: string; trustPoints: { icon: LucideIcon; label: string }[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-white p-3 shadow-card sm:p-3.5">
      <div className="min-h-[300px] sm:min-h-[340px] lg:min-h-[380px]">
        <BrandedInfoPanel panelLabel={panelLabel} trustPoints={trustPoints} />
      </div>
    </div>
  )
}

export function CompanyIntroVisual() {
  const { t, locale } = useTranslation()
  const intro = t.home.intro
  const { projects, loading, hasProjectImages } = useProjectCollageImages(3)
  const { coverage, installationArea } = useCompanyContent()

  const trustPoints = [
    {
      icon: MapPin,
      label: coverage || intro.badges.coverage,
    },
    {
      icon: ShieldCheck,
      label: installationArea || intro.badges.installation,
    },
    {
      icon: Headphones,
      label: intro.badges.afterSales,
    },
  ]

  const panelLabel = intro.panelLabel

  if (loading) {
    return <CollageSkeleton />
  }

  if (!hasProjectImages) {
    return <BrandedLogoOnlyPanel panelLabel={panelLabel} trustPoints={trustPoints} />
  }

  const [mainProject, ...secondaryProjects] = projects
  const imageCount = projects.length

  if (!mainProject) {
    return <BrandedLogoOnlyPanel panelLabel={panelLabel} trustPoints={trustPoints} />
  }

  const frameClass =
    'overflow-hidden rounded-2xl border border-surface-200 bg-white p-3 shadow-card sm:p-3.5'
  const minHeight = 'min-h-[300px] sm:min-h-[340px] lg:min-h-[380px]'

  if (imageCount === 1) {
    return (
      <div className={frameClass}>
        <div className={`grid ${minHeight} grid-cols-1 gap-3 lg:grid-cols-[1.85fr_1fr]`}>
          <ProjectImageTile
            project={mainProject}
            locale={locale}
            className="min-h-[220px] lg:min-h-0"
            priority
          />
          <BrandedInfoPanel panelLabel={panelLabel} trustPoints={trustPoints} />
        </div>
      </div>
    )
  }

  if (imageCount === 2) {
    const secondProject = secondaryProjects[0]
    return (
      <div className={frameClass}>
        <div className={`grid ${minHeight} grid-cols-1 gap-3 lg:grid-cols-[1.65fr_1fr]`}>
          <ProjectImageTile
            project={mainProject}
            locale={locale}
            className="min-h-[220px] lg:min-h-0"
            priority
          />
          <div className="grid min-h-[240px] grid-rows-2 gap-3 lg:min-h-0">
            {secondProject && (
              <ProjectImageTile project={secondProject} locale={locale} className="min-h-[110px]" />
            )}
            <BrandedInfoPanel panelLabel={panelLabel} trustPoints={trustPoints} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={frameClass}>
      <div className={`grid ${minHeight} grid-cols-1 gap-3 lg:grid-cols-3 lg:grid-rows-2`}>
        <ProjectImageTile
          project={mainProject}
          locale={locale}
          className="min-h-[220px] lg:col-span-2 lg:row-span-2 lg:min-h-0"
          priority
        />
        {secondaryProjects[0] && (
          <ProjectImageTile
            project={secondaryProjects[0]}
            locale={locale}
            className="min-h-[120px] lg:col-span-1 lg:min-h-0"
          />
        )}
        {secondaryProjects[1] && (
          <ProjectImageTile
            project={secondaryProjects[1]}
            locale={locale}
            className="min-h-[120px] lg:col-span-1 lg:min-h-0"
          />
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 border-t border-surface-100 pt-3">
        {trustPoints.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-surface-200 bg-surface-50 px-3 py-1.5 text-[11px] font-medium text-text-primary sm:text-xs"
          >
            <Icon className="size-3.5 shrink-0 text-brand-blue" aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
