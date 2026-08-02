import { motion } from 'framer-motion'
import { MapPin, MessageCircle } from 'lucide-react'
import { companyProfile } from '@/data/company'
import { useTranslation } from '@/utils'

export function ContactCtaSection() {
  const { t } = useTranslation()
  const cta = t.home.cta

  return (
    <section className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl gradient-navy px-6 py-12 md:px-12 md:py-16"
        >
          <div className="absolute end-0 top-0 size-64 rounded-full bg-brand-yellow/10 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">{cta.heading}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">{cta.description}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={companyProfile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg gradient-accent px-6 py-3 text-sm font-semibold text-brand-navy shadow-soft transition-opacity hover:opacity-90"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {cta.whatsapp}
              </a>
              <a
                href={companyProfile.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-yellow/40 hover:bg-white/10"
              >
                <MapPin className="size-4" aria-hidden="true" />
                {cta.visitLocation}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
