import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

interface ProjectsBreadcrumbProps {
  current?: string
}

export function ProjectsBreadcrumb({ current }: ProjectsBreadcrumbProps) {
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
            {t.projectsCatalog.breadcrumbHome}
          </Link>
        </li>
        <li aria-hidden="true" className="flex items-center">
          <Separator className="size-3.5" />
        </li>
        <li>
          {current ? (
            <Link
              to={ROUTES.projects}
              className="transition-colors hover:text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              {t.projectsCatalog.breadcrumbProjects}
            </Link>
          ) : (
            <span className="text-white/90" aria-current="page">
              {t.projectsCatalog.breadcrumbProjects}
            </span>
          )}
        </li>
        {current && (
          <>
            <li aria-hidden="true" className="flex items-center">
              <Separator className="size-3.5" />
            </li>
            <li>
              <span className="line-clamp-1 text-white/90" aria-current="page">
                {current}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}
