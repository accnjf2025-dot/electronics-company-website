import { motion } from 'framer-motion'
import {
  CorporateContactCta,
  CorporatePageHero,
  CorporateSectionHeader,
  PartnerCard,
} from '@/components/corporate'
import { partners } from '@/data'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

export function PartnersPage() {
  const { t } = useTranslation()
  const copy = t.corporate.partners

  return (
    <>
      <CorporatePageHero title={t.pages.partners.title} description={t.pages.partners.subtitle} />

      <section className="overflow-x-hidden bg-surface-50 py-10 md:py-12">
        <div className="container-main mx-auto max-w-6xl space-y-10 md:space-y-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <PartnerCard partner={partner} />
              </motion.div>
            ))}
          </div>

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
