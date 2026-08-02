import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/common'
import { services } from '@/data'
import { ROUTES } from '@/routes/paths'
import { pickLocalized, useTranslation } from '@/utils'

export function ServicesSection() {
  const { t, locale } = useTranslation()
  const section = t.home.services

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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Link
                  to={ROUTES.services}
                  className="group flex h-full flex-col rounded-xl border border-surface-200 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-yellow/40 hover:shadow-card"
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-brand-navy text-brand-yellow">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-brand-navy md:text-lg">
                    {pickLocalized(service, 'title', locale)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                    {pickLocalized(service, 'description', locale)}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
