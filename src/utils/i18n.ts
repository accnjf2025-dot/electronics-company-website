import type { Locale } from '@/data/translations'
import { translations, defaultLocale } from '@/data/translations'

export function t(locale: Locale = defaultLocale) {
  return translations[locale]
}

export function getNavItems(locale: Locale = defaultLocale) {
  const text = translations[locale].nav

  return [
    { label: text.home, path: '/' },
    { label: text.identity, path: '/identity' },
    { label: text.story, path: '/story' },
    { label: text.products, path: '/products' },
    { label: text.services, path: '/services' },
    { label: text.projects, path: '/projects' },
    { label: text.partners, path: '/partners' },
    { label: text.contact, path: '/contact' },
  ]
}

export { pickLocalized, pickProjectTitle } from './localized'
export { useLocale, useTranslation } from '@/hooks/useTranslation'
