import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/common'
import { ProjectCard } from '@/components/projects'
import { getFeaturedProjects } from '@/data'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

export function FeaturedProjectsSection() {
  const { t } = useTranslation()
  const section = t.home.featuredProjects
  const featuredProjects = getFeaturedProjects()

  return (
    <section className="section-padding bg-surface-50">
      <div className="container-main">
        <SectionHeader
          label={section.label}
          title={section.heading}
          subtitle={section.subtitle}
          actionLabel={t.common.viewAll}
          actionTo={ROUTES.projects}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
