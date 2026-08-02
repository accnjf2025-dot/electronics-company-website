import type { Locale } from '@/data/translations'

const ARABIC_SCRIPT = /[\u0600-\u06FF]/

function trimValue(value: string | undefined | null): string {
  return value?.trim() ?? ''
}

export function isAsciiSlugLike(value: string): boolean {
  const trimmed = value.trim()
  return trimmed.length > 0 && /^[a-z0-9]+(-[a-z0-9]+)*$/i.test(trimmed)
}

export function hasArabicScript(value: string): boolean {
  return ARABIC_SCRIPT.test(value)
}

export function pickLocalized(
  item: object,
  field: string,
  locale: Locale,
): string {
  const record = item as Record<string, string>
  const arValue = trimValue(record[`${field}Ar`])
  const enValue = trimValue(record[`${field}En`])
  if (locale === 'ar' && arValue) return arValue
  if (enValue) return enValue
  if (arValue) return arValue
  return ''
}

interface ProjectTitleFields {
  titleAr: string
  titleEn: string
  slug: string
}

export function pickProjectTitle(project: ProjectTitleFields, locale: Locale): string {
  const titleAr = trimValue(project.titleAr)
  const titleEn = trimValue(project.titleEn)
  const slug = trimValue(project.slug)

  const arabicTitleIsUsable = Boolean(titleAr) && hasArabicScript(titleAr)
  const arabicTitleLooksLikeSlug =
    Boolean(titleAr) && isAsciiSlugLike(titleAr) && !hasArabicScript(titleAr)

  if (locale === 'ar') {
    if (arabicTitleIsUsable) return titleAr
    if (titleEn) return titleEn
    if (titleAr && !arabicTitleLooksLikeSlug) return titleAr
    return slug
  }

  if (titleEn) return titleEn
  if (arabicTitleIsUsable) return titleAr
  if (titleAr && !arabicTitleLooksLikeSlug) return titleAr
  return slug
}
