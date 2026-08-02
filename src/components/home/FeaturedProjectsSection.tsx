import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/common'
import { HomeProjectCard, HomeProjectGridSkeleton } from '@/components/home/HomeProjectCard'
import { useFeaturedProjects } from '@/hooks/api'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

export function FeaturedProjectsSection() {
  const { t } = useTranslation()
  const section = t.home.featuredProjects
  const { projects, loading, hasProjects } = useFeaturedProjects()

  if (!loading && !hasProjects) {
    return null
  }

  const useTwoColumns = projects.length === 4
  const gridClass = useTwoColumns
    ? 'grid-cols-1 sm:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

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
        {loading ? (
          <HomeProjectGridSkeleton count={4} columns={useTwoColumns ? 2 : 3} />
        ) : (
          <div className={`grid gap-5 ${gridClass}`}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="min-w-0"
              >
                <HomeProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
