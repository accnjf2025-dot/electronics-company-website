import {
  Award,
  Camera,
  Handshake,
  Home,
  Layers,
  Lightbulb,
  Lock,
  Package,
  Shield,
  Speaker,
  Sun,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { resolveMediaUrl } from '@/lib/api/config'
import type {
  ApiCompanyProfileDto,
  ApiCompanyValueDto,
  ApiPartnerDto,
  ApiServiceDetailDto,
  ApiServiceListDto,
} from '@/lib/api/types'
import { translations } from '@/data/translations'
import type { CompanyProfile, CompanyValue } from '@/types/company'
import type { Partner } from '@/types/partner'
import type { Service } from '@/types/service'

const DEFAULT_LOGO = '/images/brand/future-of-technology-logo.png'
const PARTNER_LOGO_FALLBACK = '/images/placeholder.svg'

const CORPORATE_ICONS: Record<string, LucideIcon> = {
  speaker: Speaker,
  camera: Camera,
  shield: Shield,
  sun: Sun,
  lock: Lock,
  home: Home,
  award: Award,
  handshake: Handshake,
  lightbulb: Lightbulb,
  layers: Layers,
  users: Users,
  wrench: Wrench,
  package: Package,
}

function normalizeText(value: string | null | undefined): string {
  return value?.trim() ?? ''
}

function resolveIcon(iconKey: string | null | undefined): LucideIcon {
  const key = iconKey?.trim().toLowerCase()
  return (key && CORPORATE_ICONS[key]) || Package
}

function derivePhoneTel(phone: string): string {
  return phone.replace(/\D/g, '')
}

function deriveWhatsappUrl(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : ''
}

export function mapCompanyProfile(dto: ApiCompanyProfileDto): CompanyProfile {
  const nameAr = normalizeText(dto.name_ar)
  const nameEn = normalizeText(dto.name_en)
  const phone = normalizeText(dto.phone)
  const whatsapp = normalizeText(dto.whatsapp)

  return {
    id: dto.id,
    nameAr,
    nameEn,
    taglineAr: '',
    taglineEn: '',
    shortDescriptionAr: normalizeText(dto.short_description_ar),
    shortDescriptionEn: normalizeText(dto.short_description_en),
    phone,
    phoneTel: derivePhoneTel(phone),
    whatsapp,
    whatsappUrl: deriveWhatsappUrl(whatsapp),
    addressAr: normalizeText(dto.address_ar),
    addressEn: normalizeText(dto.address_en),
    openingHoursAr: normalizeText(dto.opening_hours_ar),
    openingHoursEn: normalizeText(dto.opening_hours_en),
    coverageAr: normalizeText(dto.service_coverage_ar),
    coverageEn: normalizeText(dto.service_coverage_en),
    installationAreaAr: normalizeText(dto.installation_area_ar),
    installationAreaEn: normalizeText(dto.installation_area_en),
    logoPath: dto.logo ? resolveMediaUrl(dto.logo) : DEFAULT_LOGO,
    logoAltAr: nameAr ? `شعار ${nameAr}` : '',
    logoAltEn: nameEn ? `${nameEn} logo` : '',
    links: {
      facebook: normalizeText(dto.facebook_url),
      instagram: normalizeText(dto.instagram_url),
      maps: normalizeText(dto.google_maps_url),
      gini: normalizeText(dto.gini_url),
    },
    storyAr: normalizeText(dto.story_ar),
    storyEn: normalizeText(dto.story_en),
    visionAr: normalizeText(dto.vision_ar),
    visionEn: normalizeText(dto.vision_en),
    missionAr: normalizeText(dto.mission_ar),
    missionEn: normalizeText(dto.mission_en),
  }
}

export function mapCompanyValue(dto: ApiCompanyValueDto): CompanyValue {
  return {
    id: dto.id,
    titleAr: normalizeText(dto.title_ar),
    titleEn: normalizeText(dto.title_en),
    descriptionAr: normalizeText(dto.description_ar),
    descriptionEn: normalizeText(dto.description_en),
    icon: resolveIcon(dto.icon),
    displayOrder: dto.display_order,
  }
}

function mapServiceFeatures(
  features: ApiServiceDetailDto['features'] | undefined,
): { includesAr: string[]; includesEn: string[] } {
  if (!features?.length) {
    return { includesAr: [], includesEn: [] }
  }

  const sorted = [...features].sort((a, b) => a.display_order - b.display_order)
  return {
    includesAr: sorted.map((feature) => normalizeText(feature.text_ar)).filter(Boolean),
    includesEn: sorted.map((feature) => normalizeText(feature.text_en)).filter(Boolean),
  }
}

export function mapServiceListItem(dto: ApiServiceListDto): Service {
  return {
    id: dto.id,
    slug: dto.slug,
    titleAr: normalizeText(dto.name_ar),
    titleEn: normalizeText(dto.name_en),
    descriptionAr: normalizeText(dto.short_description_ar),
    descriptionEn: normalizeText(dto.short_description_en),
    includesAr: [],
    includesEn: [],
    icon: resolveIcon(dto.icon),
    coverImage: dto.cover_image ? resolveMediaUrl(dto.cover_image) : undefined,
    isFeatured: dto.is_featured,
  }
}

export function mapServiceDetail(dto: ApiServiceDetailDto): Service {
  const base = mapServiceListItem(dto)
  const features = mapServiceFeatures(dto.features)

  return {
    ...base,
    descriptionAr: normalizeText(dto.short_description_ar) || base.descriptionAr,
    descriptionEn: normalizeText(dto.short_description_en) || base.descriptionEn,
    includesAr: features.includesAr,
    includesEn: features.includesEn,
  }
}

export function mapPartner(dto: ApiPartnerDto): Partner {
  return {
    id: dto.id,
    name: normalizeText(dto.name),
    logo: dto.logo ? resolveMediaUrl(dto.logo) : PARTNER_LOGO_FALLBACK,
    website: normalizeText(dto.website_url),
    descriptionAr: normalizeText(dto.description_ar),
    descriptionEn: normalizeText(dto.description_en),
    isFeatured: dto.is_featured,
    displayOrder: dto.display_order,
  }
}

export function resolveCorporateIcon(iconKey: string | null | undefined): LucideIcon {
  return resolveIcon(iconKey)
}

const MOCK_VALUE_ICONS = ['award', 'handshake', 'users', 'lightbulb']

export function getMockCompanyValues(): CompanyValue[] {
  return translations.ar.identity.values.map((value, index) => {
    const enValue = translations.en.identity.values[index]
    return {
      id: `mock-value-${index}`,
      titleAr: value.title,
      titleEn: enValue?.title ?? value.title,
      descriptionAr: value.description,
      descriptionEn: enValue?.description ?? value.description,
      icon: resolveIcon(MOCK_VALUE_ICONS[index]),
      displayOrder: index,
    }
  })
}
