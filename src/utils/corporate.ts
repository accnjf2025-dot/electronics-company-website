import type { Locale } from '@/data/translations'

export function buildWhatsAppContactUrl(params: {
  name: string
  phone: string
  inquiryType: string
  message: string
  locale: Locale
  whatsappUrl: string
}): string {
  const { name, phone, inquiryType, message, locale, whatsappUrl } = params
  if (!whatsappUrl) return ''

  const text =
    locale === 'ar'
      ? `الاسم: ${name}\nالهاتف: ${phone}\nنوع الاستفسار: ${inquiryType}\n\n${message}`
      : `Name: ${name}\nPhone: ${phone}\nInquiry type: ${inquiryType}\n\n${message}`

  return `${whatsappUrl}?text=${encodeURIComponent(text)}`
}

export const externalLinkProps = {
  target: '_blank' as const,
  rel: 'noopener noreferrer' as const,
}
