import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

interface ProductsBreadcrumbProps {
  current?: string
}

export function ProductsBreadcrumb({ current }: ProductsBreadcrumbProps) {
  const { t, locale } = useTranslation()
  const Separator = locale === 'ar' ? ChevronLeft : ChevronRight

  return (
    <nav aria-label="Breadcrumb" className="mt-3">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
        <li>
          <Link
            to={ROUTES.home}
            className="transition-colors hover:text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            {t.catalog.breadcrumbHome}
          </Link>
        </li>
        <li aria-hidden="true" className="flex items-center">
          <Separator className="size-3.5" />
        </li>
        <li>
          {current ? (
            <Link
              to={ROUTES.products}
              className="transition-colors hover:text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              {t.catalog.breadcrumbProducts}
            </Link>
          ) : (
            <span className="text-white/90" aria-current="page">
              {t.catalog.breadcrumbProducts}
            </span>
          )}
        </li>
        {current && (
          <>
            <li aria-hidden="true" className="flex items-center">
              <Separator className="size-3.5" />
            </li>
            <li>
              <span className="text-white/90 line-clamp-1" aria-current="page">
                {current}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}
