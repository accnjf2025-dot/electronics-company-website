import type { Product, AvailabilityStatus } from '@/types'
import type { Locale } from '@/data/translations'
import { companyProfile } from '@/data/company'
import { getCategoryBySlug, products } from '@/data'
import { pickLocalized } from '@/utils/localized'
import { formatPrice } from '@/utils/format'

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name'

export interface ProductFilterState {
  search: string
  category: string
  brand: string
  availability: string
  warranty: string
  installation: string
  installment: string
  sort: SortOption
}

export const DEFAULT_FILTERS: ProductFilterState = {
  search: '',
  category: '',
  brand: '',
  availability: '',
  warranty: '',
  installation: '',
  installment: '',
  sort: 'newest',
}

export function getUniqueBrands(): string[] {
  return [...new Set(products.map((p) => p.brand))].sort()
}

export function parseFiltersFromParams(params: URLSearchParams): ProductFilterState {
  return {
    search: params.get('search') ?? '',
    category: params.get('category') ?? '',
    brand: params.get('brand') ?? '',
    availability: params.get('availability') ?? '',
    warranty: params.get('warranty') ?? '',
    installation: params.get('installation') ?? '',
    installment: params.get('installment') ?? '',
    sort: (params.get('sort') as SortOption) || 'newest',
  }
}

export function filtersToParams(filters: ProductFilterState): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.search) params.set('search', filters.search)
  if (filters.category) params.set('category', filters.category)
  if (filters.brand) params.set('brand', filters.brand)
  if (filters.availability) params.set('availability', filters.availability)
  if (filters.warranty) params.set('warranty', filters.warranty)
  if (filters.installation) params.set('installation', filters.installation)
  if (filters.installment) params.set('installment', filters.installment)
  if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort)
  return params
}

export function filterProducts(items: Product[], filters: ProductFilterState): Product[] {
  let result = [...items]

  if (filters.category) {
    const cat = getCategoryBySlug(filters.category)
    if (cat) {
      result = result.filter((p) => p.categoryId === cat.id)
    }
  }

  if (filters.brand) {
    result = result.filter((p) => p.brand === filters.brand)
  }

  if (filters.availability) {
    result = result.filter((p) => p.availability === filters.availability)
  }

  if (filters.warranty === 'yes') {
    result = result.filter((p) => p.warrantyAvailable)
  } else if (filters.warranty === 'no') {
    result = result.filter((p) => !p.warrantyAvailable)
  }

  if (filters.installation === 'yes') {
    result = result.filter((p) => p.installationAvailable)
  } else if (filters.installation === 'no') {
    result = result.filter((p) => !p.installationAvailable)
  }

  if (filters.installment === 'yes') {
    result = result.filter((p) => p.installmentAvailable)
  } else if (filters.installment === 'no') {
    result = result.filter((p) => !p.installmentAvailable)
  }

  if (filters.search.trim()) {
    const q = filters.search.trim().toLowerCase()
    result = result.filter(
      (p) =>
        p.nameAr.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.shortDescriptionAr.toLowerCase().includes(q) ||
        p.shortDescriptionEn.toLowerCase().includes(q),
    )
  }

  return sortProducts(result, filters.sort)
}

export function sortProducts(items: Product[], sort: SortOption): Product[] {
  const sorted = [...items]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'name':
      return sorted.sort((a, b) => a.nameEn.localeCompare(b.nameEn))
    case 'newest':
    default:
      return sorted.sort((a, b) => {
        const aNum = Number(a.id.replace(/\D/g, ''))
        const bNum = Number(b.id.replace(/\D/g, ''))
        return bNum - aNum
      })
  }
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id,
  )
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit)
  }
  const extras = products.filter(
    (p) =>
      p.id !== product.id &&
      p.featured &&
      !sameCategory.some((s) => s.id === p.id),
  )
  return [...sameCategory, ...extras].slice(0, limit)
}

export function buildWhatsAppInquiryUrl(
  product: Product,
  locale: Locale,
  pageUrl: string,
): string {
  const name = pickLocalized(product, 'name', locale)
  const price = formatPrice(product.price, product.currency, locale)
  const message =
    locale === 'ar'
      ? `مرحبًا، أود الاستفسار عن المنتج: ${name} بسعر ${price}\n${pageUrl}`
      : `Hello, I would like to inquire about: ${name} priced at ${price}\n${pageUrl}`
  return `${companyProfile.whatsappUrl}?text=${encodeURIComponent(message)}`
}

export function getAvailabilityLabelKey(status: AvailabilityStatus): 'inStock' | 'preOrder' | 'outOfStock' {
  switch (status) {
    case 'in_stock':
      return 'inStock'
    case 'pre_order':
      return 'preOrder'
    case 'out_of_stock':
      return 'outOfStock'
  }
}

export function countActiveFilters(filters: ProductFilterState): number {
  let count = 0
  if (filters.search) count++
  if (filters.category) count++
  if (filters.brand) count++
  if (filters.availability) count++
  if (filters.warranty) count++
  if (filters.installation) count++
  if (filters.installment) count++
  return count
}
