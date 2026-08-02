import type { Project } from '@/types'
import { pickLocalized, useTranslation } from '@/utils'

interface ProjectSectionsProps {
  project: Project
}

interface SectionConfig {
  key: 'challenge' | 'solution' | 'results'
  labelKey: 'challenge' | 'solution' | 'results'
}

const SECTIONS: SectionConfig[] = [
  { key: 'challenge', labelKey: 'challenge' },
  { key: 'solution', labelKey: 'solution' },
  { key: 'results', labelKey: 'results' },
]

export function ProjectSections({ project }: ProjectSectionsProps) {
  const { t, locale } = useTranslation()

  const visibleSections = SECTIONS.map((section) => ({
    ...section,
    content: pickLocalized(project, section.key, locale),
  })).filter((section) => Boolean(section.content))

  if (visibleSections.length === 0) return null

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visibleSections.map((section) => (
        <article
          key={section.key}
          className="h-full rounded-xl border border-surface-200 bg-white p-5 shadow-soft md:p-6"
        >
          <h2 className="text-base font-bold text-brand-navy">{t.projectsCatalog[section.labelKey]}</h2>
          <p className="mt-2 text-sm leading-[1.65] text-text-secondary">{section.content}</p>
        </article>
      ))}
    </section>
  )
}
