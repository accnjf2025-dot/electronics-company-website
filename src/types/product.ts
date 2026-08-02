export type AvailabilityStatus = 'in_stock' | 'out_of_stock' | 'pre_order'

export interface ProductSpecification {
  labelAr: string
  labelEn: string
  valueAr: string
  valueEn: string
}

export interface ProductFeature {
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
}

export interface Product {
  id: string
  nameAr: string
  nameEn: string
  slug: string
  categoryId: string
  brand: string
  shortDescriptionAr: string
  shortDescriptionEn: string
  fullDescriptionAr: string
  fullDescriptionEn: string
  price: number
  currency: string
  oldPrice?: number
  availability: AvailabilityStatus
  featured: boolean
  images: string[]
  specifications: ProductSpecification[]
  features: ProductFeature[]
  deliveryAvailable?: boolean
  installationAvailable?: boolean
  installationAreaAr?: string
  installationAreaEn?: string
  warrantyAvailable?: boolean
  warrantyTextAr?: string
  warrantyTextEn?: string
  installmentAvailable?: boolean
  installmentUrl?: string
  afterSalesSupport?: boolean
}
