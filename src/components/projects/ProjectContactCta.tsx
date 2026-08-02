import { Link } from 'react-router-dom'
import type { Project } from '@/types'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'
import { buildWhatsAppProjectInquiryUrl } from '@/utils/projectPortfolio'

interface ProjectContactCtaProps {
  project: Project
  pageUrl: string
}

export function ProjectContactCta({ project, pageUrl }: ProjectContactCtaProps) {
  const { t, locale } = useTranslation()
  const whatsappUrl = buildWhatsAppProjectInquiryUrl(project, locale, pageUrl)

  return (
    <section className="rounded-xl border border-surface-200 bg-white p-5 shadow-soft md:p-6">
      <h2 className="text-xl font-bold text-brand-navy md:text-2xl">{t.projectsCatalog.ctaHeading}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-[1.65] text-text-secondary md:text-base">
        {t.projectsCatalog.ctaText}
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        >
          {t.projectsCatalog.contactWhatsapp}
        </a>
        <Link
          to={ROUTES.contact}
          className="inline-flex items-center justify-center rounded-lg btn-gini px-5 py-3 text-sm font-semibold text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        >
          {t.projectsCatalog.requestConsultation}
        </Link>
      </div>
    </section>
  )
}
