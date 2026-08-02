import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { companyProfile } from '@/data/company'
import { ROUTES } from '@/routes/paths'
import { externalLinkProps } from '@/utils/corporate'

interface CorporateContactCtaProps {
  heading: string
  description?: string
  whatsappLabel: string
  secondaryLabel: string
  secondaryTo?: string
}

export function CorporateContactCta({
  heading,
  description,
  whatsappLabel,
  secondaryLabel,
  secondaryTo = ROUTES.contact,
}: CorporateContactCtaProps) {
  return (
    <section className="rounded-xl border border-surface-200 bg-white p-6 shadow-soft md:p-8">
      <h2 className="text-xl font-bold text-brand-navy md:text-2xl">{heading}</h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
          {description}
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={companyProfile.whatsappUrl}
          {...externalLinkProps}
          className="inline-flex items-center gap-2 rounded-lg gradient-accent px-5 py-2.5 text-sm font-semibold text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          {whatsappLabel}
        </a>
        <Link
          to={secondaryTo}
          className="inline-flex items-center gap-2 rounded-lg border border-surface-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-yellow/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        >
          {secondaryLabel}
        </Link>
      </div>
    </section>
  )
}
