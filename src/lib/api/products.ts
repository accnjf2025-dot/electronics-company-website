import { apiGet, fetchAllPages } from '@/lib/api/client'
import {
  applyLocalProductSort,
  mapProductCategory,
  mapProductDetail,
  mapProductListItem,
} from '@/lib/api/mappers/products'
import type {
  ApiBrandDto,
  ApiProductCategoryDto,
  ApiProductDetailDto,
  ApiProductListDto,
} from '@/lib/api/types'
import type { Product, ProductCategory } from '@/types'
import type { Locale } from '@/data/translations'
import type { ProductFilterState, SortOption } from '@/utils/products'

function mapSortToOrdering(sort: SortOption): string | undefined {
  switch (sort) {
    case 'newest':
      return '-created_at'
    case 'price-asc':
      return 'price'
    case 'price-desc':
      return '-price'
    case 'name':
      return 'name_en'
    default:
      return undefined
  }
}

function mapAvailabilityToApi(value: string): string | undefined {
  if (!value) return undefined
  if (value === 'pre_order') return 'on_request'
  return value
}

function mapYesNoToBoolean(value: string): string | undefined {
  if (value === 'yes') return 'true'
  if (value === 'no') return 'false'
  return undefined
}

export interface ProductQueryParams {
  filters: ProductFilterState
  brandSlug?: string
  locale: Locale
}

export function buildProductQueryParams({
  filters,
  brandSlug,
}: Omit<ProductQueryParams, 'locale'>): Record<string, string | undefined> {
  return {
    category: filters.category || undefined,
    brand: brandSlug || filters.brand || undefined,
    availability: mapAvailabilityToApi(filters.availability),
    warranty: mapYesNoToBoolean(filters.warranty),
    installation: mapYesNoToBoolean(filters.installation),
    installment: mapYesNoToBoolean(filters.installment),
    search: filters.search.trim() || undefined,
    ordering: filters.sort === 'name' ? undefined : mapSortToOrdering(filters.sort),
  }
}

export async function fetchProductCategories(signal?: AbortSignal): Promise<ProductCategory[]> {
  const payload = await apiGet<ApiProductCategoryDto[] | { results: ApiProductCategoryDto[] }>(
    '/product-categories/',
    undefined,
    signal,
  )
  const items = Array.isArray(payload) ? payload : payload.results
  return [...items]
    .sort((a, b) => a.display_order - b.display_order)
    .map(mapProductCategory)
}

export async function fetchBrands(signal?: AbortSignal): Promise<ApiBrandDto[]> {
  const payload = await apiGet<ApiBrandDto[] | { results: ApiBrandDto[] }>(
    '/brands/',
    undefined,
    signal,
  )
  const items = Array.isArray(payload) ? payload : payload.results
  return items.sort((a, b) => a.display_order - b.display_order)
}

export async function fetchProducts(
  params: ProductQueryParams,
  signal?: AbortSignal,
): Promise<{ products: Product[]; count: number }> {
  const query = buildProductQueryParams(params)
  const { items, count } = await fetchAllPages<ApiProductListDto>('/products/', query, signal)
  let products = items.map(mapProductListItem)
  products = applyLocalProductSort(products, params.filters.sort, params.locale)
  return { products, count }
}

export async function fetchFeaturedProducts(
  limit: number,
  locale: Locale,
  signal?: AbortSignal,
): Promise<Product[]> {
  const { items } = await fetchAllPages<ApiProductListDto>(
    '/products/',
    { featured: 'true', ordering: '-created_at' },
    signal,
  )
  return applyLocalProductSort(items.map(mapProductListItem), 'newest', locale).slice(0, limit)
}

export async function fetchProductBySlug(slug: string, signal?: AbortSignal): Promise<Product> {
  const payload = await apiGet<ApiProductDetailDto>(`/products/${slug}/`, undefined, signal)
  return mapProductDetail(payload)
}

export async function fetchRelatedProducts(
  product: Product,
  limit: number,
  locale: Locale,
  signal?: AbortSignal,
): Promise<Product[]> {
  const categorySlug = product.categorySlug
  if (!categorySlug) {
    return []
  }

  const categoryProducts = await fetchAllPages<ApiProductListDto>(
    '/products/',
    { category: categorySlug, ordering: '-created_at' },
    signal,
  )

  let related = categoryProducts.items
    .map(mapProductListItem)
    .filter((item) => item.id !== product.id)

  if (related.length < limit) {
    const featured = await fetchAllPages<ApiProductListDto>(
      '/products/',
      { featured: 'true', ordering: '-created_at' },
      signal,
    )
    const extras = featured.items
      .map(mapProductListItem)
      .filter(
        (item) => item.id !== product.id && !related.some((existing) => existing.id === item.id),
      )
    related = [...related, ...extras]
  }

  return applyLocalProductSort(related, 'newest', locale).slice(0, limit)
}
