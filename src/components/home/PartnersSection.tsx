import { motion } from 'framer-motion'
import { SectionHeader, ImageWithFallback } from '@/components/common'
import { partners } from '@/data'
import { ROUTES } from '@/routes/paths'
import { pickLocalized, useTranslation } from '@/utils'

export function PartnersSection() {
  const { t, locale } = useTranslation()
  const section = t.home.partners

  return (
    <section className="section-padding bg-surface-50">
      <div className="container-main">
        <SectionHeader
          label={section.label}
          title={section.heading}
          subtitle={section.subtitle}
          actionLabel={t.common.viewAll}
          actionTo={ROUTES.partners}
          align="center"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner, index) => {
            const Wrapper = partner.website ? 'a' : 'div'
            const linkProps = partner.website
              ? { href: partner.website, target: '_blank', rel: 'noopener noreferrer' }
              : {}

            return (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Wrapper
                  {...linkProps}
                  className="group flex flex-col items-center justify-center rounded-xl border border-surface-200 bg-white px-4 py-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-yellow/30 hover:shadow-card"
                  aria-label={partner.name}
                >
                  <div className="flex h-10 w-full items-center justify-center grayscale transition-all group-hover:grayscale-0">
                    <ImageWithFallback
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-8 max-w-full object-contain opacity-70 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <span className="mt-3 text-center text-xs font-semibold text-text-muted transition-colors group-hover:text-brand-navy">
                    {partner.name}
                  </span>
                  <span className="mt-1 line-clamp-2 text-center text-[11px] text-text-muted">
                    {pickLocalized(partner, 'description', locale)}
                  </span>
                </Wrapper>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
