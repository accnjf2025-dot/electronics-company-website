import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, Globe } from 'lucide-react'
import { Logo } from '@/components/common'
import { companyProfile } from '@/data/company'
import { getNavItems, useTranslation } from '@/utils'

const externalLinkProps = {
  target: '_blank' as const,
  rel: 'noopener noreferrer' as const,
}

export function Footer() {
  const { t, locale } = useTranslation()
  const navItems = getNavItems(locale)

  return (
    <footer className="gradient-navy text-white" role="contentinfo">
      <div className="container-main section-padding">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo variant="footer" className="brightness-0 invert" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">{t.footer.description}</p>
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
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{t.company.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${companyProfile.phoneTel}`}
                  className="transition-colors hover:text-brand-yellow"
                >
                  {companyProfile.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{t.company.openingHours}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Globe className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{t.company.coverage}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-base font-semibold">{t.footer.socialLinks}</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={companyProfile.links.facebook}
                  {...externalLinkProps}
                  className="text-white/70 transition-colors hover:text-brand-yellow"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={companyProfile.links.instagram}
                  {...externalLinkProps}
                  className="text-white/70 transition-colors hover:text-brand-yellow"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={companyProfile.links.maps}
                  {...externalLinkProps}
                  className="text-white/70 transition-colors hover:text-brand-yellow"
                >
                  {t.footer.visitMaps}
                </a>
              </li>
              <li>
                <a
                  href={companyProfile.links.gini}
                  {...externalLinkProps}
                  className="text-white/70 transition-colors hover:text-brand-yellow"
                >
                  {t.footer.gini}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-white/60">{t.company.installationArea}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  )
}
