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
  CorporateErrorState,
  CorporatePageHero,
  CorporateSectionHeader,
  InfoPanel,
} from '@/components/corporate'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import { useTranslation } from '@/utils'
import { externalLinkProps } from '@/utils/corporate'

export function ContactPage() {
  const { t } = useTranslation()
  const contact = t.contact
  const corporate = t.corporate.contact
  const {
    phone,
    phoneTel,
    whatsapp,
    whatsappUrl,
    address,
    openingHours,
    coverage,
    links,
    loading,
    error,
    hasCompany,
    retry,
  } = useCompanyContent()

  const quickActions = [
    phoneTel
      ? {
          label: corporate.callNow,
          href: `tel:${phoneTel}`,
          icon: Phone,
          external: false,
        }
      : null,
    whatsappUrl
      ? {
          label: contact.chatWhatsapp,
          href: whatsappUrl,
          icon: MessageCircle,
          external: true,
        }
      : null,
    links.maps
      ? {
          label: corporate.openMaps,
          href: links.maps,
          icon: MapPin,
          external: true,
        }
      : null,
    links.gini
      ? {
          label: corporate.shopGini,
          href: links.gini,
          icon: ShoppingBag,
          external: true,
        }
      : null,
    links.facebook
      ? {
          label: corporate.visitFacebook,
          href: links.facebook,
          icon: Share2,
          external: true,
        }
      : null,
    links.instagram
      ? {
          label: corporate.visitInstagram,
          href: links.instagram,
          icon: AtSign,
          external: true,
        }
      : null,
  ].filter(Boolean) as {
    label: string
    href: string
    icon: typeof Phone
    external: boolean
  }[]

  if (error && !hasCompany && !loading) {
    return (
      <>
        <CorporatePageHero title={t.pages.contact.title} description={t.pages.contact.subtitle} />
        <section className="bg-surface-50 py-10">
          <div className="container-main mx-auto max-w-3xl">
            <CorporateErrorState
              title={t.corporate.companyUnavailableTitle}
              description={t.corporate.companyUnavailableDescription}
              retryLabel={t.corporate.tryAgain}
              onRetry={retry}
            />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <CorporatePageHero title={t.pages.contact.title} description={t.pages.contact.subtitle} />

      <section className="overflow-x-hidden bg-surface-50 py-10 pb-24 md:py-12 md:pb-12">
        <div className="container-main mx-auto max-w-6xl space-y-10 md:space-y-12">
          <div>
            <CorporateSectionHeader title={corporate.infoHeading} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {phone && phoneTel && (
                <InfoPanel icon={Phone} label={contact.phoneLabel}>
                  <a
                    href={`tel:${phoneTel}`}
                    className="text-brand-blue transition-colors hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                  >
                    {phone}
                  </a>
                </InfoPanel>
              )}
              {whatsapp && whatsappUrl && (
                <InfoPanel icon={MessageCircle} label={contact.whatsappLabel}>
                  <a
                    href={whatsappUrl}
                    {...externalLinkProps}
                    className="text-brand-blue transition-colors hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                  >
                    {whatsapp}
                    <span className="sr-only"> {corporate.externalLink}</span>
                  </a>
                </InfoPanel>
              )}
              {address && (
                <InfoPanel icon={MapPin} label={contact.addressLabel}>
                  {address}
                </InfoPanel>
              )}
              {openingHours && (
                <InfoPanel icon={Clock} label={contact.hoursLabel}>
                  {openingHours}
                </InfoPanel>
              )}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {links.maps && (
                <InfoPanel icon={MapPin} label={contact.mapsLabel}>
                  <a
                    href={links.maps}
                    {...externalLinkProps}
                    className="inline-flex items-center gap-1 text-brand-blue transition-colors hover:text-brand-navy"
                  >
                    {contact.getDirections}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">{corporate.externalLink}</span>
                  </a>
                </InfoPanel>
              )}
              {links.gini && (
                <InfoPanel icon={ShoppingBag} label={contact.giniLabel}>
                  <a
                    href={links.gini}
                    {...externalLinkProps}
                    className="inline-flex items-center gap-1 text-brand-blue transition-colors hover:text-brand-navy"
                  >
                    {contact.giniLabel}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">{corporate.externalLink}</span>
                  </a>
                </InfoPanel>
              )}
              {links.facebook && (
                <InfoPanel icon={Share2} label="Facebook">
                  <a
                    href={links.facebook}
                    {...externalLinkProps}
                    className="inline-flex items-center gap-1 text-brand-blue transition-colors hover:text-brand-navy"
                  >
                    Facebook
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">{corporate.externalLink}</span>
                  </a>
                </InfoPanel>
              )}
              {links.instagram && (
                <InfoPanel icon={AtSign} label="Instagram">
                  <a
                    href={links.instagram}
                    {...externalLinkProps}
                    className="inline-flex items-center gap-1 text-brand-blue transition-colors hover:text-brand-navy"
                  >
                    Instagram
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">{corporate.externalLink}</span>
                  </a>
                </InfoPanel>
              )}
            </div>
          </div>

          {quickActions.length > 0 && (
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
          )}

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <ContactForm />

            <div className="space-y-6">
              <article className="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-soft">
                <div className="gradient-navy px-6 py-8 text-center">
                  <MapPin className="mx-auto size-10 text-brand-yellow" aria-hidden="true" />
                  <h2 className="mt-3 text-lg font-bold text-white">{corporate.locationHeading}</h2>
                  {address && <p className="mt-2 text-sm text-white/80">{address}</p>}
                </div>
                {links.maps && (
                  <div className="p-5">
                    <a
                      href={links.maps}
                      {...externalLinkProps}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg btn-gini px-5 py-2.5 text-sm font-semibold text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                    >
                      <MapPin className="size-4" aria-hidden="true" />
                      {corporate.openInMaps}
                      <span className="sr-only">{corporate.externalLink}</span>
                    </a>
                  </div>
                )}
              </article>

              {coverage && (
                <div className="rounded-xl border border-brand-yellow/30 bg-brand-yellow/5 p-5">
                  <p className="text-sm leading-relaxed text-text-secondary">{coverage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
