export interface ApiBrandDto {
  id: string
  name: string
  slug: string
  logo: string | null
  website_url: string
  display_order: number
}

export interface ApiProductCategoryDto {
  id: string
  name_ar: string
  name_en: string
  slug: string
  description_ar: string
  description_en: string
  icon: string
  image: string | null
  display_order: number
}

export interface ApiProductImageDto {
  id: string
  image: string
  alt_text_ar: string
  alt_text_en: string
  display_order: number
  is_primary: boolean
}

export interface ApiProductFeatureDto {
  id: string
  text_ar: string
  text_en: string
  display_order: number
}

export interface ApiProductSpecificationDto {
  id: string
  label_ar: string
  label_en: string
  value_ar: string
  value_en: string
  display_order: number
}

export interface ApiProductListDto {
  id: string
  name_ar: string
  name_en: string
  slug: string
  sku: string
  short_description_ar: string
  short_description_en: string
  price: string | number
  old_price: string | number | null
  currency: string
  availability: 'in_stock' | 'on_request' | 'out_of_stock'
  featured: boolean
  delivery_available: boolean
  installation_available: boolean
  installment_available: boolean
  warranty_available: boolean
  after_sales_support: boolean
  main_image: string | null
  display_order: number
  category: ApiProductCategoryDto
  brand: ApiBrandDto | null
  created_at: string
}

export interface ApiProductDetailDto extends ApiProductListDto {
  full_description_ar: string
  full_description_en: string
  installation_area_ar: string
  installation_area_en: string
  warranty_text_ar: string
  warranty_text_en: string
  images: ApiProductImageDto[]
  features: ApiProductFeatureDto[]
  specifications: ApiProductSpecificationDto[]
  updated_at: string
}

export type DataSource = 'api' | 'mock'

export interface ApiCompanyProfileDto {
  id: string
  name_ar: string
  name_en: string
  short_description_ar: string
  short_description_en: string
  story_ar: string
  story_en: string
  vision_ar: string
  vision_en: string
  mission_ar: string
  mission_en: string
  phone: string
  whatsapp: string
  address_ar: string
  address_en: string
  opening_hours_ar: string
  opening_hours_en: string
  service_coverage_ar: string
  service_coverage_en: string
  installation_area_ar: string
  installation_area_en: string
  facebook_url: string
  instagram_url: string
  google_maps_url: string
  gini_url: string
  logo: string | null
  updated_at: string
}

export interface ApiCompanyValueDto {
  id: string
  title_ar: string
  title_en: string
  description_ar: string
  description_en: string
  icon: string
  display_order: number
}

export interface ApiServiceFeatureDto {
  id: string
  text_ar: string
  text_en: string
  display_order: number
}

export interface ApiServiceListDto {
  id: string
  name_ar: string
  name_en: string
  slug: string
  short_description_ar: string
  short_description_en: string
  icon: string
  cover_image: string | null
  display_order: number
  is_featured: boolean
}

export interface ApiServiceDetailDto extends ApiServiceListDto {
  full_description_ar: string
  full_description_en: string
  features: ApiServiceFeatureDto[]
  created_at: string
  updated_at: string
}

export interface ApiPartnerDto {
  id: string
  name: string
  slug: string
  logo: string | null
  website_url: string
  description_ar: string
  description_en: string
  display_order: number
  is_featured: boolean
}

export interface ApiProjectCategoryDto {
  id: string
  name_ar: string
  name_en: string
  slug: string
  description_ar: string
  description_en: string
  display_order: number
}

export interface ApiProjectImageDto {
  id: string
  image: string
  alt_text_ar: string
  alt_text_en: string
  display_order: number
}

export interface ApiProjectSystemDto {
  id: string
  name_ar: string
  name_en: string
  display_order: number
}

export interface ApiProjectListDto {
  id: string
  title_ar: string
  title_en: string
  slug: string
  short_description_ar: string
  short_description_en: string
  location_ar: string
  location_en: string
  completion_date: string | null
  cover_image: string | null
  featured: boolean
  status: 'planned' | 'in_progress' | 'completed'
  display_order: number
  category: ApiProjectCategoryDto
  created_at: string
}

export interface ApiProjectDetailDto extends ApiProjectListDto {
  full_description_ar: string
  full_description_en: string
  challenge_ar: string
  challenge_en: string
  solution_ar: string
  solution_en: string
  result_ar: string
  result_en: string
  client_name_ar?: string
  client_name_en?: string
  show_client_name: boolean
  confidential: boolean
  services: ApiServiceListDto[]
  images: ApiProjectImageDto[]
  systems: ApiProjectSystemDto[]
  updated_at: string
}
