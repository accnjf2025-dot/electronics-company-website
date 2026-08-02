import { ExternalLink } from 'lucide-react'
import type { Partner } from '@/types'
import { ImageWithFallback } from '@/components/common'
import { pickLocalized, useTranslation } from '@/utils'
import { externalLinkProps } from '@/utils/corporate'

interface PartnerCardProps {
  partner: Partner
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const { t, locale } = useTranslation()
  const description = pickLocalized(partner, 'description', locale)
  const hasWebsite = Boolean(partner.website)
  const Wrapper = hasWebsite ? 'a' : 'article'
  const linkProps = hasWebsite ? { href: partner.website, ...externalLinkProps } : {}

  return (
    <Wrapper
      {...linkProps}
      className="group flex h-full flex-col items-center rounded-xl border border-surface-200 bg-white px-4 py-6 shadow-soft transition-all hover:border-brand-yellow/30 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
      aria-label={hasWebsite ? `${partner.name} – ${t.corporate.partners.visitWebsite}` : partner.name}
    >
      <div className="flex h-14 w-full items-center justify-center">
        <ImageWithFallback
          src={partner.logo}
          alt={partner.name}
          className="max-h-10 max-w-[80%] object-contain opacity-60 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
        />
      </div>
      <h3 className="mt-3 text-sm font-bold text-brand-navy">{partner.name}</h3>
      <p className="mt-1 line-clamp-2 text-center text-xs leading-relaxed text-text-muted">{description}</p>
      {hasWebsite && (
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-blue opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <ExternalLink className="size-3" aria-hidden="true" />
          {t.corporate.partners.visitWebsite}
          <span className="sr-only">{t.corporate.contact.externalLink}</span>
        </span>
      )}
    </Wrapper>
  )
}
