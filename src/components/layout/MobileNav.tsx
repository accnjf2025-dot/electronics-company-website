import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { LanguageSwitcher } from '@/components/common'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import { getNavItems, useTranslation } from '@/utils'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { t, locale } = useTranslation()
  const { name, phone, address } = useCompanyContent()
  const location = useLocation()
  const navItems = getNavItems(locale)

  const slideFrom = locale === 'ar' ? '100%' : '-100%'
  const panelPosition = locale === 'ar' ? 'start-0' : 'end-0'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.nav
            initial={{ x: slideFrom }}
            animate={{ x: 0 }}
            exit={{ x: slideFrom }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed inset-y-0 ${panelPosition} z-50 flex w-full max-w-sm flex-col bg-white shadow-elevated lg:hidden`}
            aria-label={t.nav.mainNav}
          >
            <div className="flex items-center justify-between border-b border-surface-200 px-6 py-4">
              <span className="text-base font-bold text-brand-navy">{name || t.company.name}</span>
              <button
                type="button"
                onClick={onClose}
                className="flex size-10 items-center justify-center rounded-lg text-brand-navy transition-colors hover:bg-surface-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                aria-label={t.common.closeMenu}
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>

            <div className="px-4 py-3">
              <LanguageSwitcher />
            </div>

            <ul className="flex-1 overflow-y-auto px-4 py-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-yellow/15 text-brand-navy'
                          : 'text-text-primary hover:bg-surface-100'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="border-t border-surface-200 px-6 py-4">
              {phone && <p className="text-sm text-text-muted">{phone}</p>}
              {(address || t.company.address) && (
                <p className="text-sm text-text-muted">{address || t.company.address}</p>
              )}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
