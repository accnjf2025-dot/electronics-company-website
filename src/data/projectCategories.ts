import type { ProjectCategory } from '@/types'

export const projectCategories: ProjectCategory[] = [
  {
    id: 'cat-proj-surveillance',
    slug: 'surveillance',
    nameAr: 'منظومات كاميرات المراقبة',
    nameEn: 'Surveillance Systems',
  },
  {
    id: 'cat-proj-audio',
    slug: 'audio',
    nameAr: 'المنظومات الصوتية',
    nameEn: 'Audio Systems',
  },
  {
    id: 'cat-proj-control',
    slug: 'control-governance',
    nameAr: 'منظومات السيطرة والحوكمة',
    nameEn: 'Control and Governance Systems',
  },
  {
    id: 'cat-proj-solar',
    slug: 'solar-energy',
    nameAr: 'منظومات الطاقة الشمسية',
    nameEn: 'Solar Energy Systems',
  },
  {
    id: 'cat-proj-hotel-locks',
    slug: 'smart-hotel-locks',
    nameAr: 'الأقفال الذكية للفنادق',
    nameEn: 'Smart Hotel Locks',
  },
  {
    id: 'cat-proj-smart-home',
    slug: 'smart-home',
    nameAr: 'منظومات المنزل الذكي',
    nameEn: 'Smart Home Systems',
  },
  {
    id: 'cat-proj-networking',
    slug: 'networking',
    nameAr: 'الشبكات والاتصالات',
    nameEn: 'Networking and Communications',
  },
]

export function getProjectCategoryById(id: string): ProjectCategory | undefined {
  return projectCategories.find((category) => category.id === id)
}

export function getProjectCategoryBySlug(slug: string): ProjectCategory | undefined {
  return projectCategories.find((category) => category.slug === slug)
}
