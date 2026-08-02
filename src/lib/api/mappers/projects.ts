import { resolveMediaUrl } from '@/lib/api/config'
import type {
  ApiProjectCategoryDto,
  ApiProjectDetailDto,
  ApiProjectListDto,
} from '@/lib/api/types'
import type { Locale } from '@/data/translations'
import type { ClientVisibility, Project, ProjectCategory, ProjectStatus } from '@/types'
import { sortProjects, type ProjectSortOption } from '@/utils/projectPortfolio'

const PLACEHOLDER = '/images/placeholder.svg'

function normalizeText(value: string | null | undefined): string {
  return value?.trim() ?? ''
}

function parseCompletionDate(date: string | null | undefined): { completionDate: string; year: number } {
  if (!date) {
    const year = new Date().getFullYear()
    return { completionDate: String(year), year }
  }
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    return { completionDate: date.slice(0, 7), year: Number(date.slice(0, 4)) || new Date().getFullYear() }
  }
  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, '0')
  return { completionDate: `${year}-${month}`, year }
}

function mapClientVisibility(
  showClientName: boolean,
  confidential: boolean,
  hasNames: boolean,
): ClientVisibility {
  if (!showClientName) return 'hidden'
  if (confidential) return 'generic'
  if (hasNames) return 'visible'
  return 'hidden'
}

function resolveCoverImage(url: string | null | undefined): string {
  return url ? resolveMediaUrl(url) : PLACEHOLDER
}

function collectGallery(
  dto: ApiProjectDetailDto,
  coverUrl: string,
): string[] {
  const gallery = [...dto.images]
    .sort((a, b) => a.display_order - b.display_order)
    .map((image) => resolveMediaUrl(image.image))
    .filter((url) => url !== coverUrl)

  return gallery.length > 0 ? gallery : coverUrl !== PLACEHOLDER ? [coverUrl] : []
}

export function mapProjectCategory(dto: ApiProjectCategoryDto): ProjectCategory {
  return {
    id: dto.id,
    slug: dto.slug,
    nameAr: dto.name_ar,
    nameEn: dto.name_en,
  }
}

function mapProjectBase(dto: ApiProjectListDto): Project {
  const { completionDate, year } = parseCompletionDate(dto.completion_date)
  const coverImage = resolveCoverImage(dto.cover_image)

  return {
    id: dto.id,
    titleAr: normalizeText(dto.title_ar),
    titleEn: normalizeText(dto.title_en),
    slug: normalizeText(dto.slug),
    categoryId: dto.category.id,
    categorySlug: dto.category.slug,
    categoryNameAr: normalizeText(dto.category.name_ar),
    categoryNameEn: normalizeText(dto.category.name_en),
    clientVisibility: 'hidden',
    locationAr: normalizeText(dto.location_ar),
    locationEn: normalizeText(dto.location_en),
    completionDate,
    year,
    shortDescriptionAr: normalizeText(dto.short_description_ar),
    shortDescriptionEn: normalizeText(dto.short_description_en),
    fullDescriptionAr: normalizeText(dto.short_description_ar),
    fullDescriptionEn: normalizeText(dto.short_description_en),
    coverImage,
    gallery: [],
    servicesAr: [],
    servicesEn: [],
    featured: dto.featured,
    status: dto.status as ProjectStatus,
  }
}

export function mapProjectListItem(dto: ApiProjectListDto): Project {
  return mapProjectBase(dto)
}

export function mapProjectDetail(dto: ApiProjectDetailDto): Project {
  const base = mapProjectBase(dto)
  const coverImage = resolveCoverImage(dto.cover_image)
  const hasNames = Boolean(dto.client_name_ar || dto.client_name_en)

  return {
    ...base,
    clientNameAr: dto.client_name_ar ? normalizeText(dto.client_name_ar) : undefined,
    clientNameEn: dto.client_name_en ? normalizeText(dto.client_name_en) : undefined,
    clientVisibility: mapClientVisibility(dto.show_client_name, dto.confidential, hasNames),
    confidential: dto.confidential,
    fullDescriptionAr:
      normalizeText(dto.full_description_ar) || normalizeText(dto.short_description_ar),
    fullDescriptionEn:
      normalizeText(dto.full_description_en) || normalizeText(dto.short_description_en),
    challengeAr: normalizeText(dto.challenge_ar) || undefined,
    challengeEn: normalizeText(dto.challenge_en) || undefined,
    solutionAr: normalizeText(dto.solution_ar) || undefined,
    solutionEn: normalizeText(dto.solution_en) || undefined,
    resultsAr: normalizeText(dto.result_ar) || undefined,
    resultsEn: normalizeText(dto.result_en) || undefined,
    coverImage,
    gallery: collectGallery(dto, coverImage),
    servicesAr: [...dto.services]
      .sort((a, b) => a.display_order - b.display_order)
      .map((service) => service.name_ar),
    servicesEn: [...dto.services]
      .sort((a, b) => a.display_order - b.display_order)
      .map((service) => service.name_en),
    productsOrSystemsAr: [...dto.systems]
      .sort((a, b) => a.display_order - b.display_order)
      .map((system) => system.name_ar),
    productsOrSystemsEn: [...dto.systems]
      .sort((a, b) => a.display_order - b.display_order)
      .map((system) => system.name_en),
  }
}

export function applyLocalProjectSort(
  projects: Project[],
  sort: ProjectSortOption,
  locale: Locale,
): Project[] {
  if (sort === 'name') {
    return [...projects].sort((a, b) => {
      const left = locale === 'ar' ? a.titleAr : a.titleEn
      const right = locale === 'ar' ? b.titleAr : b.titleEn
      return left.localeCompare(right, locale === 'ar' ? 'ar' : 'en')
    })
  }
  return sortProjects(projects, sort)
}

export function buildProjectLocationOptions(
  projects: Project[],
): { value: string; labelAr: string; labelEn: string }[] {
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
