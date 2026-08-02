import type { Project } from '@/types'
import { getRelatedProjects } from '@/utils/projectPortfolio'
import { useTranslation } from '@/utils'
import { ProjectGrid } from './ProjectGrid'

interface RelatedProjectsProps {
  project: Project
}

export function RelatedProjects({ project }: RelatedProjectsProps) {
  const { t } = useTranslation()
  const related = getRelatedProjects(project, 3)

  if (related.length === 0) return null

  return (
    <section>
      <h2 className="mb-6 text-xl font-bold text-brand-navy md:text-2xl">
        {t.projectsCatalog.relatedProjects}
      </h2>
      <ProjectGrid projects={related} />
    </section>
  )
}
