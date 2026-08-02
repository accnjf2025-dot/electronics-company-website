import { MessageCircle } from 'lucide-react'
import type { Service } from '@/types/service'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import { pickLocalized, useTranslation } from '@/utils'
import { externalLinkProps } from '@/utils/corporate'

interface ServiceCardProps {
  service: Service
  variant?: 'default' | 'featured'
}

export function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  const { t, locale } = useTranslation()
  const { whatsappUrl } = useCompanyContent()
  const Icon = service.icon
  const title = pickLocalized(service, 'title', locale)
  const description = pickLocalized(service, 'description', locale)
  const includes = locale === 'ar' ? service.includesAr : service.includesEn
  const whatsappMessage =
    locale === 'ar'
      ? `مرحباً، أود الاستفسار عن خدمة: ${title}`
      : `Hello, I would like to inquire about the service: ${title}`
  const inquiryUrl = whatsappUrl
    ? `${whatsappUrl}?text=${encodeURIComponent(whatsappMessage)}`
    : ''

  return (
    <article
      className={`flex h-full flex-col rounded-xl border shadow-soft transition-shadow hover:shadow-card ${
        variant === 'featured'
          ? 'border-brand-yellow/40 bg-brand-yellow/5'
          : 'border-surface-200 bg-white'
      }`}
    >
      <div className="p-5 md:p-6">
        <div className="mb-4 flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-brand-yellow">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold leading-snug text-brand-navy md:text-lg">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
          </div>
        </div>

        {includes.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              {t.corporate.services.includedWork}
            </h4>
            <ul className="mt-2 space-y-1.5">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-yellow" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {inquiryUrl && (
        <div className="mt-auto border-t border-surface-200 px-5 py-4 md:px-6">
          <a
            href={inquiryUrl}
            {...externalLinkProps}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {t.corporate.services.inquire}
          </a>
        </div>
      )}
    </article>
  )
}
