import type { Project } from '@/types'
import type { Locale } from '@/data/translations'
import { companyProfile } from '@/data/company'
import { projects } from '@/data/projects'
import { getProjectCategoryBySlug } from '@/data/projectCategories'
import { pickLocalized, pickProjectTitle } from '@/utils/localized'

export type ProjectSortOption = 'newest' | 'oldest' | 'name'

export interface ProjectFilterState {
  search: string
  category: string
  location: string
  featured: string
  sort: ProjectSortOption
}

export const DEFAULT_PROJECT_FILTERS: ProjectFilterState = {
  search: '',
  category: '',
  location: '',
  featured: '',
  sort: 'newest',
}

export function getUniqueProjectLocations(): string[] {
  const locations = new Set(projects.map((p) => p.locationEn))
  return [...locations].sort()
}

export function getProjectLocationFilterOptions(): { value: string; labelAr: string; labelEn: string }[] {
  const seen = new Map<string, { labelAr: string; labelEn: string }>()
  for (const project of projects) {
    if (!seen.has(project.locationEn)) {
      seen.set(project.locationEn, {
        labelAr: project.locationAr,
        labelEn: project.locationEn,
      })
    }
  }
  return [...seen.entries()]
    .map(([value, labels]) => ({ value, ...labels }))
    .sort((a, b) => a.labelEn.localeCompare(b.labelEn))
}

export function parseProjectFiltersFromParams(params: URLSearchParams): ProjectFilterState {
  return {
    search: params.get('search') ?? '',
    category: params.get('category') ?? '',
    location: params.get('location') ?? '',
    featured: params.get('featured') ?? '',
    sort: (params.get('sort') as ProjectSortOption) || 'newest',
  }
}

export function projectFiltersToParams(filters: ProjectFilterState): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.search) params.set('search', filters.search)
  if (filters.category) params.set('category', filters.category)
  if (filters.location) params.set('location', filters.location)
  if (filters.featured) params.set('featured', filters.featured)
  if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort)
  return params
}

export function filterProjects(items: Project[], filters: ProjectFilterState): Project[] {
  let result = [...items]

  if (filters.category) {
    const category = getProjectCategoryBySlug(filters.category)
    if (category) {
      result = result.filter((p) => p.categoryId === category.id)
    }
  }

  if (filters.location) {
    result = result.filter((p) => p.locationEn === filters.location)
  }

  if (filters.featured === 'true') {
    result = result.filter((p) => p.featured)
  } else if (filters.featured === 'false') {
    result = result.filter((p) => !p.featured)
  }

  if (filters.search.trim()) {
    const q = filters.search.trim().toLowerCase()
    result = result.filter(
      (p) =>
        p.titleAr.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.shortDescriptionAr.toLowerCase().includes(q) ||
        p.shortDescriptionEn.toLowerCase().includes(q) ||
        p.categoryNameAr.toLowerCase().includes(q) ||
        p.categoryNameEn.toLowerCase().includes(q),
    )
  }

  return sortProjects(result, filters.sort)
}

export function sortProjects(items: Project[], sort: ProjectSortOption): Project[] {
  const sorted = [...items]
  switch (sort) {
    case 'oldest':
      return sorted.sort((a, b) => a.year - b.year || a.completionDate.localeCompare(b.completionDate))
    case 'name':
      return sorted.sort((a, b) => a.titleEn.localeCompare(b.titleEn))
    case 'newest':
    default:
      return sorted.sort((a, b) => b.year - a.year || b.completionDate.localeCompare(a.completionDate))
  }
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const sameCategory = projects.filter(
    (p) => p.categoryId === project.categoryId && p.id !== project.id,
  )
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit)
  }
  const extras = projects.filter(
    (p) => p.id !== project.id && p.featured && !sameCategory.some((s) => s.id === p.id),
  )
  return [...sameCategory, ...extras].slice(0, limit)
}

export function buildWhatsAppProjectInquiryUrl(
  project: Project,
  locale: Locale,
  pageUrl: string,
): string {
  const title = pickProjectTitle(project, locale)
  const message =
    locale === 'ar'
      ? `مرحبًا، أود الاستفسار عن مشروع: ${title}\n${pageUrl}`
      : `Hello, I would like to inquire about the project: ${title}\n${pageUrl}`
  return `${companyProfile.whatsappUrl}?text=${encodeURIComponent(message)}`
}

export function getProjectClientLabel(project: Project, locale: Locale): string | null {
  if (project.clientVisibility === 'hidden') return null
  const name = pickLocalized(project, 'clientName', locale)
  return name || null
}

export function countActiveProjectFilters(filters: ProjectFilterState): number {
  let count = 0
  if (filters.search) count++
  if (filters.category) count++
  if (filters.location) count++
  if (filters.featured) count++
  return count
}
