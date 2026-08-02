import { apiGet, fetchAllPages } from '@/lib/api/client'
import {
  mapCompanyProfile,
  mapCompanyValue,
  mapPartner,
  mapServiceDetail,
  mapServiceListItem,
} from '@/lib/api/mappers/corporate'
import type {
  ApiCompanyProfileDto,
  ApiCompanyValueDto,
  ApiPartnerDto,
  ApiServiceDetailDto,
  ApiServiceListDto,
} from '@/lib/api/types'
import type { CompanyProfile, CompanyValue } from '@/types/company'
import type { Partner } from '@/types/partner'
import type { Service } from '@/types/service'

export async function fetchCompanyProfile(signal?: AbortSignal): Promise<CompanyProfile> {
  const payload = await apiGet<ApiCompanyProfileDto>('/company/', undefined, signal)
  return mapCompanyProfile(payload)
}

export async function fetchCompanyValues(signal?: AbortSignal): Promise<CompanyValue[]> {
  const payload = await apiGet<ApiCompanyValueDto[] | { results: ApiCompanyValueDto[] }>(
    '/values/',
    undefined,
    signal,
  )
  const items = Array.isArray(payload) ? payload : payload.results
  return [...items]
    .sort((a, b) => a.display_order - b.display_order)
    .map(mapCompanyValue)
}

export async function fetchServices(signal?: AbortSignal): Promise<Service[]> {
  const { items } = await fetchAllPages<ApiServiceListDto>('/services/', undefined, signal)
  const sorted = [...items].sort((a, b) => a.display_order - b.display_order)

  const detailed = await Promise.all(
    sorted.map(async (item) => {
      try {
        const payload = await apiGet<ApiServiceDetailDto>(
          `/services/${item.slug}/`,
          undefined,
          signal,
        )
        return mapServiceDetail(payload)
      } catch {
        return mapServiceListItem(item)
      }
    }),
  )

  return detailed
}

export async function fetchFeaturedServices(limit: number, signal?: AbortSignal): Promise<Service[]> {
  const services = await fetchServices(signal)
  const featured = services.filter((service) => service.isFeatured)
  const source = featured.length > 0 ? featured : services
  return source.slice(0, limit)
}

export async function fetchServiceBySlug(slug: string, signal?: AbortSignal): Promise<Service> {
  const payload = await apiGet<ApiServiceDetailDto>(`/services/${slug}/`, undefined, signal)
  return mapServiceDetail(payload)
}

export async function fetchPartners(signal?: AbortSignal): Promise<Partner[]> {
  const { items } = await fetchAllPages<ApiPartnerDto>('/partners/', undefined, signal)
  return [...items]
    .sort((a, b) => a.display_order - b.display_order)
    .map(mapPartner)
}

export async function fetchFeaturedPartners(limit: number, signal?: AbortSignal): Promise<Partner[]> {
  const partners = await fetchPartners(signal)
  const featured = partners.filter((partner) => partner.isFeatured)
  const source = featured.length > 0 ? featured : partners
  return source.slice(0, limit)
}
