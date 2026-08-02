import { apiGet, fetchAllPages } from '@/lib/api/client'
import {
  applyLocalProjectSort,
  buildProjectLocationOptions,
  mapProjectCategory,
  mapProjectDetail,
  mapProjectListItem,
} from '@/lib/api/mappers/projects'
import type {
  ApiProjectCategoryDto,
  ApiProjectDetailDto,
  ApiProjectListDto,
} from '@/lib/api/types'
import type { Locale } from '@/data/translations'
import type { Project, ProjectCategory } from '@/types'
import type { ProjectFilterState, ProjectSortOption } from '@/utils/projectPortfolio'

function mapSortToOrdering(sort: ProjectSortOption): string | undefined {
  switch (sort) {
    case 'newest':
      return '-completion_date'
    case 'oldest':
      return 'completion_date'
    case 'name':
      return undefined
    default:
      return '-completion_date'
  }
}

export function buildProjectQueryParams(
  filters: ProjectFilterState,
): Record<string, string | undefined> {
  return {
    category: filters.category || undefined,
    location: filters.location || undefined,
    featured:
      filters.featured === 'true'
        ? 'true'
        : filters.featured === 'false'
          ? 'false'
          : undefined,
    search: filters.search.trim() || undefined,
    ordering: mapSortToOrdering(filters.sort),
  }
}

export async function fetchProjectCategories(signal?: AbortSignal): Promise<ProjectCategory[]> {
  const payload = await apiGet<ApiProjectCategoryDto[] | { results: ApiProjectCategoryDto[] }>(
    '/project-categories/',
    undefined,
    signal,
  )
  const items = Array.isArray(payload) ? payload : payload.results
  return [...items]
    .sort((a, b) => a.display_order - b.display_order)
    .map(mapProjectCategory)
}

export async function fetchProjects(
  filters: ProjectFilterState,
  locale: Locale,
  signal?: AbortSignal,
): Promise<{ projects: Project[]; count: number }> {
  const query = buildProjectQueryParams(filters)
  const { items, count } = await fetchAllPages<ApiProjectListDto>('/projects/', query, signal)
  const projects = applyLocalProjectSort(items.map(mapProjectListItem), filters.sort, locale)
  return { projects, count }
}

export async function fetchFeaturedProjects(
  locale: Locale,
  signal?: AbortSignal,
): Promise<Project[]> {
  const { items } = await fetchAllPages<ApiProjectListDto>(
    '/projects/',
    { featured: 'true', ordering: '-completion_date' },
    signal,
  )
  return applyLocalProjectSort(items.map(mapProjectListItem), 'newest', locale)
}

export async function fetchProjectBySlug(slug: string, signal?: AbortSignal): Promise<Project> {
  const payload = await apiGet<ApiProjectDetailDto>(`/projects/${slug}/`, undefined, signal)
  return mapProjectDetail(payload)
}

export async function fetchRelatedProjects(
  project: Project,
  limit: number,
  locale: Locale,
  signal?: AbortSignal,
): Promise<Project[]> {
  const categorySlug = project.categorySlug
  if (!categorySlug) {
    return []
  }

  const categoryProjects = await fetchAllPages<ApiProjectListDto>(
    '/projects/',
    { category: categorySlug, ordering: '-completion_date' },
    signal,
  )

  let related = categoryProjects.items
    .map(mapProjectListItem)
    .filter((item) => item.id !== project.id)

  if (related.length < limit) {
    const featured = await fetchAllPages<ApiProjectListDto>(
      '/projects/',
      { featured: 'true', ordering: '-completion_date' },
      signal,
    )
    const extras = featured.items
      .map(mapProjectListItem)
      .filter(
        (item) => item.id !== project.id && !related.some((existing) => existing.id === item.id),
      )
    related = [...related, ...extras]
  }

  return applyLocalProjectSort(related, 'newest', locale).slice(0, limit)
}

export async function fetchProjectLocationOptions(
  signal?: AbortSignal,
): Promise<{ value: string; labelAr: string; labelEn: string }[]> {
  const { items } = await fetchAllPages<ApiProjectListDto>(
    '/projects/',
    { ordering: '-completion_date' },
    signal,
  )
  return buildProjectLocationOptions(items.map(mapProjectListItem))
}
