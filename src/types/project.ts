export type ProjectStatus = 'completed' | 'in_progress' | 'planned'

export type ClientVisibility = 'visible' | 'generic' | 'hidden'

export interface Project {
  id: string
  titleAr: string
  titleEn: string
  slug: string
  categoryId: string
  categoryNameAr: string
  categoryNameEn: string
  clientNameAr?: string
  clientNameEn?: string
  clientVisibility: ClientVisibility
  locationAr: string
  locationEn: string
  completionDate: string
  year: number
  shortDescriptionAr: string
  shortDescriptionEn: string
  fullDescriptionAr: string
  fullDescriptionEn: string
  challengeAr?: string
  challengeEn?: string
  solutionAr?: string
  solutionEn?: string
  resultsAr?: string
  resultsEn?: string
  coverImage: string
  gallery: string[]
  servicesAr: string[]
  servicesEn: string[]
  productsOrSystemsAr?: string[]
  productsOrSystemsEn?: string[]
  featured: boolean
  confidential?: boolean
  status: ProjectStatus
}

export interface ProjectCategory {
  id: string
  slug: string
  nameAr: string
  nameEn: string
}
