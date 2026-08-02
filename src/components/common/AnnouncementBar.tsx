import { companyProfile } from '@/data/company'
import { useTranslation } from '@/utils'

export function AnnouncementBar() {
  const { t } = useTranslation()

  return (
    <div className="bg-brand-navy text-sm text-white" role="region" aria-label={t.common.announcementLabel}>
      <div className="container-main flex items-center justify-center py-2.5 text-center">
        <a
          href={companyProfile.links.gini}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        >
          {t.announcement.message}
        </a>
      </div>
    </div>
  )
}
