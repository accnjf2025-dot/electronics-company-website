const DEV_FALLBACK_BASE = 'http://127.0.0.1:8001/api/v1'

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '')
}

export function getApiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim()
  if (configured) return trimTrailingSlash(configured)
  if (import.meta.env.DEV) return DEV_FALLBACK_BASE
  return ''
}

export function getApiOrigin(): string {
  const base = getApiBaseUrl()
  if (!base) return ''
  return base.replace(/\/api\/v\d+$/, '')
}

export function isApiConfigured(): boolean {
  return Boolean(getApiBaseUrl())
}

export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return '/images/placeholder.svg'
  if (/^https?:\/\//i.test(url)) return url
  const origin = getApiOrigin()
  if (!origin) return url.startsWith('/') ? url : `/${url}`
  return `${origin}${url.startsWith('/') ? url : `/${url}`}`
}
