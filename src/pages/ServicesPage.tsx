import { motion } from 'framer-motion'
import {
  CorporateContactCta,
  CorporatePageHero,
  CorporateSectionHeader,
  ProcessSteps,
  ServiceCard,
} from '@/components/corporate'
import { services } from '@/data'
import { useTranslation } from '@/utils'

export function ServicesPage() {
  const { t } = useTranslation()
  const copy = t.corporate.services

  return (
    <>
      <CorporatePageHero title={t.pages.services.title} description={t.pages.services.subtitle} />

      <section className="overflow-x-hidden bg-surface-50 py-10 md:py-12">
        <div className="container-main space-y-10 md:space-y-12">
          <div className="mx-auto max-w-6xl">
            <CorporateSectionHeader title={copy.introHeading} description={copy.introText} />
            <ul className="mt-6 flex flex-wrap gap-2">
              {copy.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-md bg-brand-yellow/15 px-3 py-1.5 text-sm font-medium text-brand-navy"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto max-w-6xl">
            <CorporateSectionHeader title={t.common.ourServices} />
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                >
                  <ServiceCard service={service} variant={index % 3 === 0 ? 'featured' : 'default'} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-6xl">
            <CorporateSectionHeader title={copy.processHeading} />
            <div className="mt-6">
              <ProcessSteps steps={[...copy.processSteps]} />
            </div>
          </div>

          <div className="mx-auto max-w-6xl">
            <CorporateContactCta
              heading={copy.ctaHeading}
              description={copy.ctaText}
              whatsappLabel={copy.ctaWhatsapp}
              secondaryLabel={copy.ctaContact}
            />
          </div>
        </div>
      </section>
    </>
  )
}
