import type { Project } from '@/types'
import { useRelatedProjects } from '@/hooks/api'
import { useTranslation } from '@/utils'
import { ProjectGridSkeleton } from './ProjectsApiStates'
import { ProjectGrid } from './ProjectGrid'

interface RelatedProjectsProps {
  project: Project
}

export function RelatedProjects({ project }: RelatedProjectsProps) {
  const { t } = useTranslation()
  const { related, loading } = useRelatedProjects(project, 3)

  if (!loading && related.length === 0) return null

  return (
    <section>
      <h2 className="mb-6 text-xl font-bold text-brand-navy md:text-2xl">
        {t.projectsCatalog.relatedProjects}
      </h2>
      {loading ? (
        <ProjectGridSkeleton count={3} />
      ) : (
        <ProjectGrid projects={related} />
      )}
    </section>
  )
}
