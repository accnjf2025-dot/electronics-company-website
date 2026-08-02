import { Wrench } from 'lucide-react'
import type { Project } from '@/types'
import { pickLocalized, useTranslation } from '@/utils'

interface ProjectServicesProps {
  project: Project
}

export function ProjectServices({ project }: ProjectServicesProps) {
  const { t, locale } = useTranslation()
  const services = locale === 'ar' ? project.servicesAr : project.servicesEn
  const systems =
    locale === 'ar' ? project.productsOrSystemsAr : project.productsOrSystemsEn
  const category = pickLocalized(project, 'categoryName', locale)

  if (services.length === 0 && (!systems || systems.length === 0)) return null

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-brand-navy">{t.projectsCatalog.servicesDelivered}</h2>
      <div className="grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <article className="flex h-full gap-3 rounded-xl border border-surface-200 bg-white p-4 shadow-soft">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-yellow/15">
            <Wrench className="size-5 text-brand-navy" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-brand-navy">{t.projectsCatalog.projectType}</h3>
            <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">{category}</p>
          </div>
        </article>

        {services.map((service) => (
          <article
            key={service}
            className="flex h-full items-center rounded-xl border border-surface-200 bg-white px-4 py-3 shadow-soft"
          >
            <span className="text-sm font-medium text-brand-navy">{service}</span>
          </article>
        ))}

        {systems?.map((system) => (
          <article
            key={system}
            className="flex h-full items-center rounded-xl border border-brand-yellow/30 bg-brand-yellow/5 px-4 py-3 shadow-soft"
          >
            <span className="text-sm font-medium text-brand-navy">{system}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
