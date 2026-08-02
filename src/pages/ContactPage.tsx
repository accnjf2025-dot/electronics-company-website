import {
  AtSign,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  ShoppingBag,
} from 'lucide-react'
import {
  ContactForm,
  CorporatePageHero,
  CorporateSectionHeader,
  InfoPanel,
} from '@/components/corporate'
import { companyProfile } from '@/data/company'
import { useTranslation } from '@/utils'
import { externalLinkProps } from '@/utils/corporate'

export function ContactPage() {
  const { t } = useTranslation()
  const contact = t.contact
  const corporate = t.corporate.contact

  const quickActions = [
    {
      label: corporate.callNow,
      href: `tel:${companyProfile.phoneTel}`,
      icon: Phone,
      external: false,
    },
    {
      label: contact.chatWhatsapp,
      href: companyProfile.whatsappUrl,
      icon: MessageCircle,
      external: true,
    },
    {
      label: corporate.openMaps,
      href: companyProfile.links.maps,
      icon: MapPin,
      external: true,
    },
    {
      label: corporate.shopGini,
      href: companyProfile.links.gini,
      icon: ShoppingBag,
      external: true,
    },
    {
      label: corporate.visitFacebook,
      href: companyProfile.links.facebook,
      icon: Share2,
      external: true,
    },
    {
      label: corporate.visitInstagram,
      href: companyProfile.links.instagram,
      icon: AtSign,
      external: true,
    },
  ]

  return (
    <>
      <CorporatePageHero title={t.pages.contact.title} description={t.pages.contact.subtitle} />

      <section className="overflow-x-hidden bg-surface-50 py-10 pb-24 md:py-12 md:pb-12">
        <div className="container-main mx-auto max-w-6xl space-y-10 md:space-y-12">
          <div>
            <CorporateSectionHeader title={corporate.infoHeading} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoPanel icon={Phone} label={contact.phoneLabel}>
                <a
                  href={`tel:${companyProfile.phoneTel}`}
                  className="text-brand-blue transition-colors hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                >
                  {companyProfile.phone}
                </a>
              </InfoPanel>
              <InfoPanel icon={MessageCircle} label={contact.whatsappLabel}>
                <a
                  href={companyProfile.whatsappUrl}
                  {...externalLinkProps}
                  className="text-brand-blue transition-colors hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                >
                  {companyProfile.whatsapp}
                  <span className="sr-only"> {corporate.externalLink}</span>
                </a>
              </InfoPanel>
              <InfoPanel icon={MapPin} label={contact.addressLabel}>
                {t.company.address}
              </InfoPanel>
              <InfoPanel icon={Clock} label={contact.hoursLabel}>
                {t.company.openingHours}
              </InfoPanel>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoPanel icon={MapPin} label={contact.mapsLabel}>
                <a
                  href={companyProfile.links.maps}
                  {...externalLinkProps}
                  className="inline-flex items-center gap-1 text-brand-blue transition-colors hover:text-brand-navy"
                >
                  {contact.getDirections}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">{corporate.externalLink}</span>
                </a>
              </InfoPanel>
              <InfoPanel icon={ShoppingBag} label={contact.giniLabel}>
                <a
                  href={companyProfile.links.gini}
                  {...externalLinkProps}
                  className="inline-flex items-center gap-1 text-brand-blue transition-colors hover:text-brand-navy"
                >
                  {contact.giniLabel}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">{corporate.externalLink}</span>
                </a>
              </InfoPanel>
              <InfoPanel icon={Share2} label="Facebook">
                <a
                  href={companyProfile.links.facebook}
                  {...externalLinkProps}
                  className="inline-flex items-center gap-1 text-brand-blue transition-colors hover:text-brand-navy"
                >
                  Facebook
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">{corporate.externalLink}</span>
                </a>
              </InfoPanel>
              <InfoPanel icon={AtSign} label="Instagram">
                <a
                  href={companyProfile.links.instagram}
                  {...externalLinkProps}
                  className="inline-flex items-center gap-1 text-brand-blue transition-colors hover:text-brand-navy"
                >
                  Instagram
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">{corporate.externalLink}</span>
                </a>
              </InfoPanel>
            </div>
          </div>

          <div>
            <CorporateSectionHeader title={corporate.quickActionsHeading} />
            <div className="mt-4 flex flex-wrap gap-2">
              {quickActions.map(({ label, href, icon: Icon, external }) =>
                external ? (
                  <a
                    key={label}
                    href={href}
                    {...externalLinkProps}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-surface-200 bg-white px-4 py-2.5 text-sm font-medium text-brand-navy transition-colors hover:border-brand-yellow/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                  >
                    <Icon className="size-4 shrink-0 text-brand-blue" aria-hidden="true" />
                    {label}
                    <span className="sr-only">{corporate.externalLink}</span>
                  </a>
                ) : (
                  <a
                    key={label}
                    href={href}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-surface-200 bg-white px-4 py-2.5 text-sm font-medium text-brand-navy transition-colors hover:border-brand-yellow/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                  >
                    <Icon className="size-4 shrink-0 text-brand-blue" aria-hidden="true" />
                    {label}
                  </a>
                ),
              )}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <ContactForm />

            <div className="space-y-6">
              <article className="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-soft">
                <div className="gradient-navy px-6 py-8 text-center">
                  <MapPin className="mx-auto size-10 text-brand-yellow" aria-hidden="true" />
                  <h2 className="mt-3 text-lg font-bold text-white">{corporate.locationHeading}</h2>
                  <p className="mt-2 text-sm text-white/80">{t.company.address}</p>
                </div>
                <div className="p-5">
                  <a
                    href={companyProfile.links.maps}
                    {...externalLinkProps}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg btn-gini px-5 py-2.5 text-sm font-semibold text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                  >
                    <MapPin className="size-4" aria-hidden="true" />
                    {corporate.openInMaps}
                    <span className="sr-only">{corporate.externalLink}</span>
                  </a>
                </div>
              </article>

              <div className="rounded-xl border border-brand-yellow/30 bg-brand-yellow/5 p-5">
                <p className="text-sm leading-relaxed text-text-secondary">{corporate.coverageNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
