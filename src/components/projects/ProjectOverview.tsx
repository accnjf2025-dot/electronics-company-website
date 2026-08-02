import type { Project } from '@/types'
import { pickLocalized, useTranslation } from '@/utils'

interface ProjectOverviewProps {
  project: Project
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const { t, locale } = useTranslation()
  const shortDescription = pickLocalized(project, 'shortDescription', locale)
  const fullDescription = pickLocalized(project, 'fullDescription', locale)

  return (
    <section className="rounded-xl border border-surface-200 bg-white p-5 shadow-soft md:p-6">
      <h2 className="text-xl font-bold text-brand-navy">{t.projectsCatalog.overview}</h2>

      <div className="mt-3 max-w-3xl">
        <p className="text-base font-medium leading-relaxed text-brand-navy">{shortDescription}</p>
        <p className="mt-3 text-sm leading-[1.7] text-text-secondary md:text-base">{fullDescription}</p>
      </div>
    </section>
  )
}
