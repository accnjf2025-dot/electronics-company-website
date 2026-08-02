import { useContext } from 'react'
import { translations } from '@/data/translations'
import { LocaleContext } from '@/contexts/locale-context'

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return context
}

export function useTranslation() {
  const { locale } = useLocale()
  return { locale, t: translations[locale] }
}
