import { Link } from 'react-router-dom'
import { PageHeader, PlaceholderContent } from '@/components/common'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t.common.notFound} />
      <PlaceholderContent title={t.common.notFound} description={t.common.notFoundDescription}>
        <Link to={ROUTES.home} className="inline-flex rounded-lg gradient-accent px-6 py-2.5 text-sm font-semibold text-brand-navy">
          {t.common.backToHome}
        </Link>
      </PlaceholderContent>
    </>
  )
}
