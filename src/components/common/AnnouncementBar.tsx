import { useCompanyContent } from '@/hooks/useCompanyContent'
import { useTranslation } from '@/utils'
import { externalLinkProps } from '@/utils/corporate'

export function AnnouncementBar() {
  const { t } = useTranslation()
  const { links } = useCompanyContent()

  if (!links.gini) return null

  return (
    <div className="bg-brand-navy text-sm text-white" role="region" aria-label={t.common.announcementLabel}>
      <div className="container-main flex items-center justify-center py-2.5 text-center">
        <a
          href={links.gini}
          {...externalLinkProps}
          className="transition-colors hover:text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        >
          {t.announcement.message}
        </a>
      </div>
    </div>
  )
}
