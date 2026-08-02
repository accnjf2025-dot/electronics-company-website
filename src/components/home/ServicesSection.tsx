import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/common'
import { HomeServiceCard, HomeServiceGridSkeleton } from '@/components/home/HomeServiceCard'
import { useFeaturedServices } from '@/hooks/api'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

export function ServicesSection() {
  const { t } = useTranslation()
  const section = t.home.services
  const { services, loading, hasServices } = useFeaturedServices(6)

  if (!loading && !hasServices) return null

  return (
    <section className="section-padding bg-surface-50">
      <div className="container-main">
        <SectionHeader
          label={section.label}
          title={section.heading}
          subtitle={section.subtitle}
          actionLabel={t.common.viewAll}
          actionTo={ROUTES.services}
        />
        {loading ? (
          <HomeServiceGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="min-w-0"
              >
                <HomeServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
