import { ProjectsBreadcrumb } from './ProjectsBreadcrumb'
import { useTranslation } from '@/utils'

export function ProjectsPageHero() {
  const { t } = useTranslation()

  return (
    <section className="gradient-navy text-white">
      <div className="container-main px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t.pages.projects.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/80 md:text-lg">
            {t.pages.projects.subtitle}
          </p>
          <ProjectsBreadcrumb />
        </div>
      </div>
    </section>
  )
}
