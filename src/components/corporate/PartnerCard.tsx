import { ExternalLink } from 'lucide-react'
import type { Partner } from '@/types'
import { PartnerLogo, type PartnerLogoVariant } from './PartnerLogo'
import { pickLocalized, useTranslation } from '@/utils'
import { externalLinkProps } from '@/utils/corporate'

interface PartnerCardProps {
  partner: Partner
  variant?: PartnerLogoVariant
}

export function PartnerCard({ partner, variant = 'page' }: PartnerCardProps) {
  const { t, locale } = useTranslation()
  const description = pickLocalized(partner, 'description', locale)
  const hasWebsite = Boolean(partner.website)
  const isHomepage = variant === 'homepage'
  const Wrapper = hasWebsite ? 'a' : 'article'
  const linkProps = hasWebsite ? { href: partner.website, ...externalLinkProps } : {}

  return (
    <Wrapper
      {...linkProps}
      className={`group flex h-full flex-col items-center rounded-2xl border border-surface-200 bg-white shadow-soft transition-all hover:border-brand-yellow/45 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
        isHomepage
          ? 'min-h-[8.5rem] px-3 py-4 sm:min-h-[9.5rem] sm:px-4 sm:py-5'
          : 'min-h-[10.625rem] px-4 py-5 sm:min-h-[13.75rem] sm:px-5 sm:py-6'
      } ${hasWebsite ? 'hover:scale-[1.02]' : ''}`}
      aria-label={hasWebsite ? `${partner.name} – ${t.corporate.partners.visitWebsite}` : partner.name}
    >
      <div className={isHomepage ? '' : 'grayscale-[15%] transition-[filter,transform] duration-200 group-hover:grayscale-0'}>
        <PartnerLogo partner={partner} variant={variant} />
      </div>

      <h3
        className={`mt-3 text-center font-medium text-text-secondary transition-colors group-hover:text-brand-navy ${
          isHomepage ? 'text-[11px] sm:text-xs' : 'text-sm sm:text-base font-semibold text-brand-navy'
        }`}
      >
        {partner.name}
      </h3>

      {!isHomepage && description && (
        <p className="mt-2 line-clamp-2 flex-1 text-center text-xs leading-relaxed text-text-muted sm:text-sm">
          {description}
        </p>
      )}

      {hasWebsite && !isHomepage && (
        <span className="mt-3 inline-flex items-center justify-center gap-1 text-xs font-medium text-brand-blue">
          <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
          {t.corporate.partners.visitWebsite}
          <span className="sr-only">{t.corporate.contact.externalLink}</span>
        </span>
      )}
    </Wrapper>
  )
}
