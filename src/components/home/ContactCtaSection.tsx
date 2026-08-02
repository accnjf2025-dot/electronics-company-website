import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Clock, Headphones, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'
import { externalLinkProps } from '@/utils/corporate'

function CtaVisual({ reducedMotion }: { reducedMotion: boolean }) {
  const { logoPath, logoAlt } = useCompanyContent()

  return (
    <div className="relative mx-auto flex w-full max-w-sm items-center justify-center lg:max-w-none">
      <div className="absolute inset-4 rounded-full bg-brand-blue/20 blur-2xl" aria-hidden="true" />
      <div className="relative flex size-56 items-center justify-center sm:size-64">
        <div
          className="absolute inset-0 rounded-full border border-white/10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
          transition={reducedMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
        >
          <img src={logoPath} alt={logoAlt} className="h-14 w-auto max-w-[180px] object-contain sm:h-16" />
        </motion.div>
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, 3, 0] }}
          transition={reducedMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute -end-1 top-6 flex size-11 items-center justify-center rounded-xl bg-brand-yellow text-brand-navy shadow-lg sm:-end-2 sm:top-8 sm:size-12"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
        </motion.div>
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
          transition={reducedMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute -start-1 bottom-8 flex size-10 items-center justify-center rounded-xl border border-white/20 bg-brand-navy/80 text-brand-light-blue shadow-lg sm:-start-2 sm:bottom-10 sm:size-11"
        >
          <ShieldCheck className="size-5" aria-hidden="true" />
        </motion.div>
        <div className="absolute bottom-2 start-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-brand-yellow">
          <Phone className="size-4" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

export function ContactCtaSection() {
  const { t, locale } = useTranslation()
  const cta = t.home.cta
  const reducedMotion = useReducedMotion() ?? false
  const {
    phone,
    phoneTel,
    whatsappUrl,
    coverage,
    installationArea,
    openingHours,
    loading,
  } = useCompanyContent()

  const consultMessage =
    locale === 'ar' ? 'مرحباً، أود طلب استشارة تقنية.' : 'Hello, I would like to request a technology consultation.'
  const whatsappConsultUrl = whatsappUrl
    ? `${whatsappUrl}?text=${encodeURIComponent(consultMessage)}`
    : ''

  const chips = [
    coverage ? { icon: MapPin, label: coverage } : null,
    installationArea ? { icon: ShieldCheck, label: installationArea } : null,
    openingHours ? { icon: Clock, label: openingHours } : null,
    { icon: Headphones, label: t.home.intro.badges.afterSales },
  ]
    .filter(Boolean)
    .slice(0, 4) as { icon: typeof MapPin; label: string }[]

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-brand-navy/20 gradient-navy shadow-elevated"
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
            aria-hidden="true"
          />
          <div className="absolute end-0 top-0 size-72 rounded-full bg-brand-yellow/10 blur-3xl" aria-hidden="true" />
          <div className="absolute start-0 bottom-0 size-64 rounded-full bg-brand-blue/15 blur-3xl" aria-hidden="true" />

          <div className="relative grid items-center gap-10 px-6 py-10 md:px-10 md:py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 lg:px-12 lg:py-14">
            <div className="text-center lg:text-start">
              <span className="text-sm font-semibold tracking-wide text-brand-yellow">{cta.eyebrow}</span>
              <h2 className="mt-3 text-2xl font-bold leading-snug text-white md:text-3xl lg:text-4xl">{cta.heading}</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{cta.description}</p>

              {chips.length > 0 && (
                <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {chips.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/90 sm:text-xs"
                    >
                      <Icon className="size-3.5 shrink-0 text-brand-yellow" aria-hidden="true" />
                      <span className="truncate">{label}</span>
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                {whatsappConsultUrl && (
                  <a
                    href={whatsappConsultUrl}
                    {...externalLinkProps}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg gradient-accent px-6 py-3 text-sm font-semibold text-brand-navy shadow-soft transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {cta.whatsappConsult}
                  </a>
                )}
                <Link
                  to={ROUTES.contact}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-yellow/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                >
                  {cta.contactUs}
                </Link>
                {!loading && phone && phoneTel && (
                  <a
                    href={`tel:${phoneTel}`}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/25 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {phone}
                  </a>
                )}
              </div>
            </div>

            <CtaVisual reducedMotion={reducedMotion} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
