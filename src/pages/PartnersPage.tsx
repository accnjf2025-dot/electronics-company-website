import { motion } from 'framer-motion'
import {
  CorporateContactCta,
  CorporateErrorState,
  CorporatePageHero,
  CorporatePartnerGridSkeleton,
  CorporateSectionHeader,
  PartnerCard,
} from '@/components/corporate'
import { usePartners } from '@/hooks/api'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

export function PartnersPage() {
  const { t } = useTranslation()
  const copy = t.corporate.partners
  const { partners, loading, error, hasPartners, retry } = usePartners()

  return (
    <>
      <CorporatePageHero title={t.pages.partners.title} description={t.pages.partners.subtitle} />

      <section className="overflow-x-hidden bg-surface-50 py-10 md:py-12">
        <div className="container-main mx-auto max-w-6xl space-y-10 md:space-y-12">
          {error ? (
            <CorporateErrorState
              title={t.corporate.apiLoadPartnersError}
              description={t.corporate.apiConnectionError}
              retryLabel={t.corporate.tryAgain}
              onRetry={retry}
            />
          ) : loading ? (
            <CorporatePartnerGridSkeleton count={8} variant="page" />
          ) : !hasPartners ? (
            <div className="rounded-xl border border-surface-200 bg-white p-8 text-center shadow-soft">
              <h2 className="text-lg font-bold text-brand-navy">{t.corporate.partnersEmptyTitle}</h2>
              <p className="mt-2 text-sm text-text-secondary">{t.corporate.partnersEmptyDescription}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="min-w-0"
                >
                  <PartnerCard partner={partner} variant="page" />
                </motion.div>
              ))}
            </div>
          )}

          <div>
            <CorporateSectionHeader title={copy.categoriesHeading} align="center" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {copy.categories.map((category) => (
                <article
                  key={category.key}
                  className="rounded-xl border border-surface-200 bg-white p-5 shadow-soft"
                >
                  <h3 className="text-sm font-bold text-brand-navy">{category.label}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {category.brands.map((brand) => (
                      <li
                        key={brand}
                        className="rounded-md bg-surface-50 px-2 py-1 text-xs font-medium text-text-secondary"
                      >
                        {brand}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <CorporateContactCta
            heading={copy.ctaHeading}
            description={copy.ctaText}
            whatsappLabel={copy.ctaWhatsapp}
            secondaryLabel={copy.ctaProducts}
            secondaryTo={ROUTES.products}
          />
        </div>
      </section>
    </>
  )
}
