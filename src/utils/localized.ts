import type { Locale } from '@/data/translations'

export function pickLocalized(
  item: object,
  field: string,
  locale: Locale,
): string {
  const record = item as Record<string, string>
  const arValue = record[`${field}Ar`]
  const enValue = record[`${field}En`]
  if (locale === 'ar' && arValue) return arValue
  if (enValue) return enValue
  if (arValue) return arValue
  return ''
}
