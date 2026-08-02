import {
  Battery,
  Camera,
  Monitor,
  Package,
  Radio,
  Speaker,
  Wifi,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { companyProfile } from '@/data/company'
import type { Product, ProductCategory, ProductFeature, ProductSpecification } from '@/types'
import type { Locale } from '@/data/translations'
import { resolveMediaUrl } from '@/lib/api/config'
import type {
  ApiProductCategoryDto,
  ApiProductDetailDto,
  ApiProductListDto,
} from '@/lib/api/types'
import type { AvailabilityStatus } from '@/types/product'
import { sortProducts, type SortOption } from '@/utils/products'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  camera: Camera,
  speaker: Speaker,
  radio: Radio,
  wifi: Wifi,
  monitor: Monitor,
  wrench: Wrench,
  battery: Battery,
}

function parsePrice(value: string | number | null | undefined): number | undefined {
  if (value === null || value === undefined || value === '') return undefined
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function mapAvailability(value: ApiProductListDto['availability']): AvailabilityStatus {
  if (value === 'on_request') return 'pre_order'
  if (value === 'out_of_stock') return 'out_of_stock'
  return 'in_stock'
}

export function mapProductCategory(dto: ApiProductCategoryDto): ProductCategory {
  const iconKey = dto.icon?.trim().toLowerCase()
  const icon = (iconKey && CATEGORY_ICONS[iconKey]) || Package

  return {
    id: dto.id,
    nameAr: dto.name_ar,
    nameEn: dto.name_en,
    slug: dto.slug,
    descriptionAr: dto.description_ar,
    descriptionEn: dto.description_en,
    icon,
    image: dto.image
      ? resolveMediaUrl(dto.image)
      : `/images/categories/${dto.slug}.svg`,
  }
}

function mapSpecifications(
  specs: ApiProductDetailDto['specifications'],
): ProductSpecification[] {
  return specs.map((spec) => ({
    labelAr: spec.label_ar,
    labelEn: spec.label_en,
    valueAr: spec.value_ar,
    valueEn: spec.value_en,
  }))
}

function mapFeatures(features: ApiProductDetailDto['features']): ProductFeature[] {
  return features.map((feature) => ({
    titleAr: feature.text_ar,
    titleEn: feature.text_en,
    descriptionAr: feature.text_ar,
    descriptionEn: feature.text_en,
  }))
}

function collectImages(dto: ApiProductListDto | ApiProductDetailDto): string[] {
  const urls: string[] = []

  if ('images' in dto && dto.images.length > 0) {
    const sorted = [...dto.images].sort((a, b) => {
      if (a.is_primary === b.is_primary) return a.display_order - b.display_order
      return a.is_primary ? -1 : 1
    })
    for (const image of sorted) {
      urls.push(resolveMediaUrl(image.image))
    }
  }

  if (dto.main_image) {
    const main = resolveMediaUrl(dto.main_image)
    if (!urls.includes(main)) {
      urls.unshift(main)
    }
  }

  return urls.length > 0 ? urls : ['/images/placeholder.svg']
}

export function mapProductListItem(dto: ApiProductListDto): Product {
  const price = parsePrice(dto.price) ?? 0
  const oldPrice = parsePrice(dto.old_price)

  return {
    id: dto.id,
    nameAr: dto.name_ar,
    nameEn: dto.name_en,
    slug: dto.slug,
    categoryId: dto.category.id,
    categorySlug: dto.category.slug,
    brand: dto.brand?.name ?? '',
    shortDescriptionAr: dto.short_description_ar,
    shortDescriptionEn: dto.short_description_en,
    fullDescriptionAr: dto.short_description_ar,
    fullDescriptionEn: dto.short_description_en,
    price,
    currency: dto.currency,
    oldPrice,
    availability: mapAvailability(dto.availability),
    featured: dto.featured,
    images: collectImages(dto),
    specifications: [],
    features: [],
    deliveryAvailable: dto.delivery_available,
    installationAvailable: dto.installation_available,
    installationAreaAr: undefined,
    installationAreaEn: undefined,
    warrantyAvailable: dto.warranty_available,
    warrantyTextAr: undefined,
    warrantyTextEn: undefined,
    installmentAvailable: dto.installment_available,
    installmentUrl: dto.installment_available ? companyProfile.links.gini : undefined,
    afterSalesSupport: dto.after_sales_support,
  }
}

export function mapProductDetail(dto: ApiProductDetailDto): Product {
  const base = mapProductListItem(dto)

  return {
    ...base,
    fullDescriptionAr: dto.full_description_ar || dto.short_description_ar,
    fullDescriptionEn: dto.full_description_en || dto.short_description_en,
    installationAreaAr: dto.installation_area_ar || undefined,
    installationAreaEn: dto.installation_area_en || undefined,
    warrantyTextAr: dto.warranty_text_ar || undefined,
    warrantyTextEn: dto.warranty_text_en || undefined,
    images: collectImages(dto),
    specifications: mapSpecifications(dto.specifications),
    features: mapFeatures(dto.features),
  }
}

export function applyLocalProductSort(products: Product[], sort: SortOption, locale: Locale): Product[] {
  if (sort === 'name') {
    const sorted = [...products]
    return sorted.sort((a, b) => {
      const left = locale === 'ar' ? a.nameAr : a.nameEn
      const right = locale === 'ar' ? b.nameAr : b.nameEn
      return left.localeCompare(right, locale === 'ar' ? 'ar' : 'en')
    })
  }
  return sortProducts(products, sort)
}

export function buildBrandSlugMap(brands: { name: string; slug: string }[]): Map<string, string> {
  return new Map(brands.map((brand) => [brand.name, brand.slug]))
}
