import { useContext, useMemo } from 'react'
import { CompanyProfileContext } from '@/contexts/company-profile-context'
import type { Locale } from '@/data/translations'
import { pickLocalized } from '@/utils/localized'
import { useTranslation } from '@/hooks/useTranslation'

export function useCompanyProfileContext() {
  const context = useContext(CompanyProfileContext)
  if (!context) {
    throw new Error('useCompanyProfileContext must be used within CompanyProfileProvider')
  }
  return context
}

function localizedField(
  company: NonNullable<ReturnType<typeof useCompanyProfileContext>['company']>,
  field: string,
  locale: Locale,
): string {
  return pickLocalized(company, field, locale)
}

export function useCompanyContent() {
  const { company, loading, error, source, retry } = useCompanyProfileContext()
  const { locale, t } = useTranslation()

  return useMemo(() => {
    const hasCompany = Boolean(company)

    return {
      company,
      loading,
      error,
      source,
      retry,
      hasCompany,
      name: hasCompany ? localizedField(company!, 'name', locale) : '',
      tagline: t.company.tagline,
      shortDescription: hasCompany
        ? localizedField(company!, 'shortDescription', locale)
        : '',
      address: hasCompany ? localizedField(company!, 'address', locale) : '',
      openingHours: hasCompany ? localizedField(company!, 'openingHours', locale) : '',
      coverage: hasCompany ? localizedField(company!, 'coverage', locale) : '',
      installationArea: hasCompany ? localizedField(company!, 'installationArea', locale) : '',
      story: hasCompany ? localizedField(company!, 'story', locale) : '',
      vision: hasCompany ? localizedField(company!, 'vision', locale) : '',
      mission: hasCompany ? localizedField(company!, 'mission', locale) : '',
      intro: hasCompany ? localizedField(company!, 'shortDescription', locale) : '',
      phone: company?.phone ?? '',
      phoneTel: company?.phoneTel ?? '',
      whatsapp: company?.whatsapp ?? '',
      whatsappUrl: company?.whatsappUrl ?? '',
      logoPath: company?.logoPath ?? '/images/brand/future-of-technology-logo.png',
      logoAlt: hasCompany
        ? locale === 'ar'
          ? company!.logoAltAr || company!.nameAr
          : company!.logoAltEn || company!.nameEn
        : t.company.name,
      links: company?.links ?? {
        facebook: '',
        instagram: '',
        maps: '',
        gini: '',
      },
      copyrightName: hasCompany ? localizedField(company!, 'name', locale) : t.company.name,
    }
  }, [company, loading, error, source, retry, locale, t])
}
