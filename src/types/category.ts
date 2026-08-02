import type { LucideIcon } from 'lucide-react'

export interface ProductCategory {
  id: string
  nameAr: string
  nameEn: string
  slug: string
  descriptionAr: string
  descriptionEn: string
  icon: LucideIcon
  image: string
}
