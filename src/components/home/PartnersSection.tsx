import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/common'
import { CorporatePartnerGridSkeleton, PartnerCard } from '@/components/corporate'
import { useFeaturedPartners } from '@/hooks/api'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

export function PartnersSection() {
  const { t } = useTranslation()
  const section = t.home.partners
  const { partners, loading, hasPartners } = useFeaturedPartners(8)

  if (!loading && !hasPartners) return null

  return (
    <section className="section-padding bg-[#f3f6fb]">
      <div className="container-main">
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" aria-hidden="true" />
          <SectionHeader
            label={section.label}
            title={section.heading}
            subtitle={section.subtitle}
            actionLabel={t.common.viewAll}
            actionTo={ROUTES.partners}
            align="center"
          />
        </div>

        {loading ? (
          <CorporatePartnerGridSkeleton count={8} variant="homepage" />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 min-[480px]:gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="min-w-0"
                >
                  <PartnerCard partner={partner} variant="homepage" />
                </motion.div>
              ))}
            </div>
            {section.trustCaption && (
              <p className="mt-8 text-center text-sm font-medium text-text-secondary">{section.trustCaption}</p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
