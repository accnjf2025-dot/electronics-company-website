export interface CompanyProfile {
  id?: string
  nameAr: string
  nameEn: string
  taglineAr: string
  taglineEn: string
  shortDescriptionAr: string
  shortDescriptionEn: string
  phone: string
  phoneTel: string
  whatsapp: string
  whatsappUrl: string
  addressAr: string
  addressEn: string
  openingHoursAr: string
  openingHoursEn: string
  coverageAr: string
  coverageEn: string
  installationAreaAr: string
  installationAreaEn: string
  logoPath: string
  logoAltAr: string
  logoAltEn: string
  links: {
    facebook: string
    instagram: string
    maps: string
    gini: string
  }
  storyAr: string
  storyEn: string
  visionAr: string
  visionEn: string
  missionAr: string
  missionEn: string
}

export interface CompanyValue {
  id: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  icon: import('lucide-react').LucideIcon
  displayOrder: number
}
