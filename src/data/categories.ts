import {
  Camera,
  Speaker,
  Radio,
  Wifi,
  Monitor,
  Wrench,
  Battery,
} from 'lucide-react'
import type { ProductCategory } from '@/types'

export const productCategories: ProductCategory[] = [
  {
    id: 'cat-surveillance',
    nameAr: 'كاميرات المراقبة',
    nameEn: 'Surveillance Cameras',
    slug: 'surveillance-cameras',
    descriptionAr: 'أنظمة مراقبة متقدمة للمنازل والشركات والمؤسسات',
    descriptionEn: 'Advanced surveillance systems for homes, businesses, and institutions',
    icon: Camera,
    image: '/images/categories/surveillance-cameras.svg',
  },
  {
    id: 'cat-audio-speakers',
    nameAr: 'الأجهزة الصوتية والسماعات',
    nameEn: 'Audio Equipment and Speakers',
    slug: 'audio-speakers',
    descriptionAr: 'حلول صوتية احترافية للمنازل والقاعات والمؤسسات',
    descriptionEn: 'Professional audio solutions for homes, halls, and institutions',
    icon: Speaker,
    image: '/images/categories/audio-speakers.svg',
  },
  {
    id: 'cat-radios',
    nameAr: 'أجهزة النداء اللاسلكي واللاقطات',
    nameEn: 'Two-Way Radios and Microphones',
    slug: 'radios-microphones',
    descriptionAr: 'أجهزة اتصال لاسلكي ولاقطات للفرق والمشاريع الميدانية',
    descriptionEn: 'Two-way radios and microphones for teams and field operations',
    icon: Radio,
    image: '/images/categories/radios-microphones.svg',
  },
  {
    id: 'cat-broadcasting',
    nameAr: 'أجهزة البث والإنترنت',
    nameEn: 'Broadcasting and Internet Devices',
    slug: 'broadcasting-internet',
    descriptionAr: 'معدات بث وشبكات وإنترنت للمنازل والمؤسسات',
    descriptionEn: 'Broadcasting, networking, and internet equipment for homes and organizations',
    icon: Wifi,
    image: '/images/categories/broadcasting-internet.svg',
  },
  {
    id: 'cat-computers',
    nameAr: 'أجهزة الكمبيوتر والهواتف',
    nameEn: 'Computers and Mobile Phones',
    slug: 'computers-phones',
    descriptionAr: 'أجهزة حاسوب وهواتف ذكية للاستخدام الشخصي والمهني',
    descriptionEn: 'Computers and smartphones for personal and professional use',
    icon: Monitor,
    image: '/images/categories/computers-phones.svg',
  },
  {
    id: 'cat-accessories',
    nameAr: 'الإكسسوارات والعِدد',
    nameEn: 'Accessories and Tools',
    slug: 'accessories-tools',
    descriptionAr: 'ملحقات وعدد وأدوات داعمة لأنظمتك التقنية',
    descriptionEn: 'Accessories, tools, and supporting equipment for your technology systems',
    icon: Wrench,
    image: '/images/categories/accessories-tools.svg',
  },
  {
    id: 'cat-power',
    nameAr: 'أجهزة الطاقة وUPS',
    nameEn: 'Power Devices and UPS Systems',
    slug: 'power-ups',
    descriptionAr: 'حلول طاقة وUPS لحماية الأجهزة واستمرارية العمل',
    descriptionEn: 'Power and UPS solutions to protect devices and ensure continuity',
    icon: Battery,
    image: '/images/categories/power-ups.svg',
  },
]

export function getCategoryById(id: string): ProductCategory | undefined {
  return productCategories.find((category) => category.id === id)
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug)
}
