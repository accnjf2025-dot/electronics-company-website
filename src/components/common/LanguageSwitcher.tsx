import { Globe2 } from 'lucide-react'
import { useLocale, useTranslation } from '@/utils'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const { t } = useTranslation()

  const nextLocale = locale === 'ar' ? 'en' : 'ar'
  const label = locale === 'ar' ? 'English' : 'عربي'
  const ariaLabel = locale === 'ar' ? t.common.ariaSwitchToEnglish : t.common.ariaSwitchToArabic

  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      className="inline-flex min-h-10 min-w-10 items-center justify-center gap-1.5 rounded-lg border border-surface-200 bg-white px-2.5 py-2 text-xs font-semibold text-brand-navy transition-colors hover:border-brand-yellow/50 hover:bg-brand-yellow/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow sm:px-3 sm:text-sm"
      aria-label={ariaLabel}
    >
      <Globe2 className="size-4 shrink-0 text-brand-blue" aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}
