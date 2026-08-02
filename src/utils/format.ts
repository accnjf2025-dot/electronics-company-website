import type { Locale } from '@/data/translations'

export function formatPrice(
  price: number,
  currency = 'IQD',
  locale: Locale = 'ar',
): string {
  const intlLocale = locale === 'ar' ? 'ar-IQ' : 'en-IQ'
  const formatted = new Intl.NumberFormat(intlLocale, {
    maximumFractionDigits: 0,
  }).format(price)

  if (currency === 'IQD') {
    return locale === 'ar' ? `${formatted} د.ع` : `${formatted} IQD`
  }

  return `${formatted} ${currency}`
}

export function formatDate(dateString: string, locale: Locale = 'ar'): string {
  const [year, month] = dateString.split('-')

  if (!year || !month) {
    return dateString
  }

  const date = new Date(Number(year), Number(month) - 1)
  const intlLocale = locale === 'ar' ? 'ar-IQ' : 'en-IQ'

  return new Intl.DateTimeFormat(intlLocale, {
    year: 'numeric',
    month: 'long',
  }).format(date)
}
