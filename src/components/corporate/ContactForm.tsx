import { useState, type FormEvent } from 'react'
import { MessageCircle } from 'lucide-react'
import { useTranslation } from '@/utils'
import { buildWhatsAppContactUrl } from '@/utils/corporate'

interface FormErrors {
  name?: string
  phone?: string
  inquiryType?: string
  message?: string
}

export function ContactForm() {
  const { t, locale } = useTranslation()
  const form = t.corporate.contact
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [inquiryType, setInquiryType] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [formError, setFormError] = useState('')

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!name.trim()) next.name = form.validation.nameRequired
    if (!phone.trim()) next.phone = form.validation.phoneRequired
    if (!inquiryType) next.inquiryType = form.validation.inquiryRequired
    if (!message.trim()) next.message = form.validation.messageRequired
    return next
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    setFormError('')

    if (Object.keys(nextErrors).length > 0) {
      setFormError(Object.values(nextErrors)[0] ?? '')
      return
    }

    const url = buildWhatsAppContactUrl({ name, phone, inquiryType, message, locale })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-surface-200 bg-white p-5 shadow-soft md:p-6"
      aria-describedby={formError ? 'contact-form-error' : undefined}
    >
      <h2 className="text-lg font-bold text-brand-navy md:text-xl">{form.formHeading}</h2>
      <p className="mt-1 text-sm text-text-secondary">{form.formDescription}</p>

      {formError && (
        <p id="contact-form-error" role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {formError}
        </p>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-brand-navy">
            {form.nameLabel}
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={form.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className="mt-1.5 w-full rounded-lg border border-surface-200 px-3 py-2.5 text-sm text-brand-navy focus-visible:border-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/30"
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-brand-navy">
            {form.phoneLabel}
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={form.phonePlaceholder}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            className="mt-1.5 w-full rounded-lg border border-surface-200 px-3 py-2.5 text-sm text-brand-navy focus-visible:border-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/30"
          />
          {errors.phone && (
            <p id="contact-phone-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-inquiry" className="block text-sm font-medium text-brand-navy">
          {form.inquiryTypeLabel}
        </label>
        <select
          id="contact-inquiry"
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value)}
          aria-invalid={Boolean(errors.inquiryType)}
          aria-describedby={errors.inquiryType ? 'contact-inquiry-error' : undefined}
          className="mt-1.5 w-full rounded-lg border border-surface-200 px-3 py-2.5 text-sm text-brand-navy focus-visible:border-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/30"
        >
          <option value="">{form.inquiryTypeLabel}</option>
          {form.inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.inquiryType && (
          <p id="contact-inquiry-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.inquiryType}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="block text-sm font-medium text-brand-navy">
          {form.messageLabel}
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={form.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className="mt-1.5 w-full resize-y rounded-lg border border-surface-200 px-3 py-2.5 text-sm text-brand-navy focus-visible:border-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/30"
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex items-center gap-2 rounded-lg gradient-accent px-5 py-2.5 text-sm font-semibold text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        {form.submitLabel}
      </button>
    </form>
  )
}
