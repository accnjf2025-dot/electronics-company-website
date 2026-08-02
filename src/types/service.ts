import type { LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  slug?: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  includesAr: string[]
  includesEn: string[]
  icon: LucideIcon
  coverImage?: string
  isFeatured?: boolean
}
