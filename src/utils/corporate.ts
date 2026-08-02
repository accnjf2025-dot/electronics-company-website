import { companyProfile } from '@/data/company'
import type { Locale } from '@/data/translations'

export function buildWhatsAppContactUrl(params: {
  name: string
  phone: string
  inquiryType: string
  message: string
  locale: Locale
}): string {
  const { name, phone, inquiryType, message, locale } = params
  const text =
    locale === 'ar'
      ? `الاسم: ${name}\nالهاتف: ${phone}\nنوع الاستفسار: ${inquiryType}\n\n${message}`
      : `Name: ${name}\nPhone: ${phone}\nInquiry type: ${inquiryType}\n\n${message}`

  return `${companyProfile.whatsappUrl}?text=${encodeURIComponent(text)}`
}

export const externalLinkProps = {
  target: '_blank' as const,
  rel: 'noopener noreferrer' as const,
}
