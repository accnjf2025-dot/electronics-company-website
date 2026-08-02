import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, Globe } from 'lucide-react'
import { Logo } from '@/components/common'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import { getNavItems, useTranslation } from '@/utils'
import { externalLinkProps } from '@/utils/corporate'

export function Footer() {
  const { t, locale } = useTranslation()
  const navItems = getNavItems(locale)
  const {
    shortDescription,
    address,
    openingHours,
    coverage,
    installationArea,
    phone,
    phoneTel,
    links,
    copyrightName,
  } = useCompanyContent()

  return (
    <footer className="gradient-navy text-white" role="contentinfo">
      <div className="container-main section-padding">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo variant="footer" className="brightness-0 invert" />
            {shortDescription && (
              <p className="mt-4 text-sm leading-relaxed text-white/70">{shortDescription}</p>
            )}
          </div>

          <div>
            <h2 className="mb-4 text-base font-semibold">{t.footer.quickLinks}</h2>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-white/70 transition-colors hover:text-brand-yellow"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-base font-semibold">{t.footer.contactInfo}</h2>
            <ul className="space-y-3">
              {address && (
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{address}</span>
                </li>
              )}
              {phone && phoneTel && (
                <li className="flex items-center gap-3 text-sm text-white/70">
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${phoneTel}`}
                    className="transition-colors hover:text-brand-yellow"
                  >
                    {phone}
                  </a>
                </li>
              )}
              {openingHours && (
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{openingHours}</span>
                </li>
              )}
              {coverage && (
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <Globe className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{coverage}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-base font-semibold">{t.footer.socialLinks}</h2>
            <ul className="space-y-2 text-sm">
              {links.facebook && (
                <li>
                  <a
                    href={links.facebook}
                    {...externalLinkProps}
                    className="text-white/70 transition-colors hover:text-brand-yellow"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {links.instagram && (
                <li>
                  <a
                    href={links.instagram}
                    {...externalLinkProps}
                    className="text-white/70 transition-colors hover:text-brand-yellow"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {links.maps && (
                <li>
                  <a
                    href={links.maps}
                    {...externalLinkProps}
                    className="text-white/70 transition-colors hover:text-brand-yellow"
                  >
                    {t.footer.visitMaps}
                  </a>
                </li>
              )}
              {links.gini && (
                <li>
                  <a
                    href={links.gini}
                    {...externalLinkProps}
                    className="text-white/70 transition-colors hover:text-brand-yellow"
                  >
                    {t.footer.gini}
                  </a>
                </li>
              )}
            </ul>
            {installationArea && (
              <p className="mt-4 text-sm text-white/60">{installationArea}</p>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © 2026 {copyrightName}. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
