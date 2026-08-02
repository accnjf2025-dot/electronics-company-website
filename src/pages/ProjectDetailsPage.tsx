import { Link, useParams } from 'react-router-dom'
import {
  ProjectContactCta,
  ProjectGallery,
  ProjectHeader,
  ProjectOverview,
  ProjectSections,
  ProjectServices,
  ProjectsBreadcrumb,
  RelatedProjects,
} from '@/components/projects'
import { getProjectBySlug } from '@/data'
import { ROUTES } from '@/routes/paths'
import { pickLocalized, useTranslation } from '@/utils'

export function ProjectDetailsPage() {
  const { t, locale } = useTranslation()
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined

  if (!project) {
    return (
      <>
        <section className="gradient-navy text-white">
          <div className="container-main px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-xl font-bold text-white md:text-2xl">{t.projectsCatalog.projectNotFound}</h1>
          </div>
        </section>
        <section className="bg-surface-50">
          <div className="container-main px-4 py-10 text-center sm:px-6 lg:px-8">
            <p className="text-text-secondary">{t.common.notFoundDescription}</p>
            <Link
              to={ROUTES.projects}
              className="mt-6 inline-flex rounded-lg btn-gini px-6 py-2.5 text-sm font-semibold text-brand-navy"
            >
              {t.projectsCatalog.backToProjects}
            </Link>
          </div>
        </section>
      </>
    )
  }

  const pageUrl = `${window.location.origin}${ROUTES.projectDetails(project.slug)}`
  const category = pickLocalized(project, 'categoryName', locale)
  const galleryImages = [...new Set([project.coverImage, ...project.gallery].filter(Boolean))]
  const showGallery = galleryImages.length > 1

  return (
    <>
      <section className="gradient-navy text-white">
        <div className="container-main px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <ProjectsBreadcrumb />
          <p className="mt-2 text-sm text-white/75">{category}</p>
        </div>
      </section>

      <section className="overflow-x-hidden bg-surface-50 pb-10 md:pb-12">
        <div className="container-main px-4 py-6 sm:px-6 md:py-8 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-6 md:space-y-7">
            <ProjectHeader project={project} />

            <ProjectOverview project={project} />

            <ProjectSections project={project} />

            {showGallery && <ProjectGallery project={project} />}

            <ProjectServices project={project} />

            <ProjectContactCta project={project} pageUrl={pageUrl} />

            <RelatedProjects project={project} />
          </div>
        </div>
      </section>
    </>
  )
}
