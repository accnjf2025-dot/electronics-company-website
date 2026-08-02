import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Logo, LanguageSwitcher } from '@/components/common'
import { getNavItems, useTranslation } from '@/utils'
import { MobileNav } from './MobileNav'

export function Header() {
  const { t, locale } = useTranslation()
  const location = useLocation()
  const navItems = getNavItems(locale)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-surface-200 bg-white/95 backdrop-blur-md">
        <div className="container-main">
          <div className="flex h-16 items-center justify-between gap-2 sm:gap-3">
            <Link
              to="/"
              className="flex shrink-0 items-center transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
              aria-label={t.company.name}
            >
              <Logo variant="header" />
            </Link>

            <nav
              className="hidden flex-1 items-center justify-center gap-0.5 px-2 lg:flex xl:gap-1"
              aria-label={t.nav.mainNav}
            >
              {navItems.map((item) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path)

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative rounded-md px-2.5 py-2 text-sm font-medium transition-colors xl:px-3 ${
                      isActive
                        ? 'bg-brand-yellow/10 text-brand-navy after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand-yellow xl:after:inset-x-3'
                        : 'text-text-secondary hover:bg-surface-50 hover:text-brand-navy'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <LanguageSwitcher />

              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="flex size-10 items-center justify-center rounded-lg text-brand-navy transition-colors hover:bg-surface-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow lg:hidden"
                aria-label={t.common.openMenu}
                aria-expanded={isMobileNavOpen}
              >
                <Menu className="size-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  )
}
