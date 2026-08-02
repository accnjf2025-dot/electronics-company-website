import { getApiBaseUrl } from './config'

export class ApiError extends Error {
  readonly status?: number
  readonly url: string

  constructor(message: string, options: { status?: number; url: string; cause?: unknown }) {
    super(message, { cause: options.cause })
    this.name = 'ApiError'
    this.status = options.status
    this.url = options.url
  }
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export function isPaginatedResponse<T>(value: unknown): value is PaginatedResponse<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'results' in value &&
    Array.isArray((value as PaginatedResponse<T>).results)
  )
}

export function unwrapList<T>(payload: T[] | PaginatedResponse<T>): { items: T[]; count: number } {
  if (Array.isArray(payload)) {
    return { items: payload, count: payload.length }
  }
  if (isPaginatedResponse<T>(payload)) {
    return { items: payload.results, count: payload.count }
  }
  return { items: [], count: 0 }
}

function buildUrl(path: string, params?: Record<string, string | undefined>): string {
  const base = getApiBaseUrl()
  if (!base) {
    throw new ApiError('API base URL is not configured.', { url: path })
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = new URL(`${base}${normalizedPath}`)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, value)
      }
    }
  }
  return url.toString()
}

export async function apiGet<T>(
  path: string,
  params?: Record<string, string | undefined>,
  signal?: AbortSignal,
): Promise<T> {
  const url = buildUrl(path, params)

  let response: Response
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }
    throw new ApiError('Network error while contacting the server.', {
      url,
      cause: error,
    })
  }

  const contentType = response.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')
  let payload: unknown = null

  if (isJson) {
    try {
      payload = await response.json()
    } catch (error) {
      throw new ApiError('Failed to parse server response.', {
        status: response.status,
        url,
        cause: error,
      })
    }
  }

  if (!response.ok) {
    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'detail' in payload &&
      typeof (payload as { detail: unknown }).detail === 'string'
        ? (payload as { detail: string }).detail
        : `Request failed with status ${response.status}.`
    throw new ApiError(message, { status: response.status, url })
  }

  return payload as T
}

export async function fetchAllPages<T>(
  path: string,
  params?: Record<string, string | undefined>,
  signal?: AbortSignal,
): Promise<{ items: T[]; count: number }> {
  const first = await apiGet<T[] | PaginatedResponse<T>>(path, params, signal)
  const firstPage = unwrapList(first)

  if (Array.isArray(first)) {
    return firstPage
  }

  const items = [...firstPage.items]
  let nextUrl = isPaginatedResponse(first) ? first.next : null

  while (nextUrl) {
    let response: Response
    try {
      response = await fetch(nextUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal,
      })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw error
      }
      throw new ApiError('Network error while contacting the server.', {
        url: nextUrl,
        cause: error,
      })
    }

    const payload = (await response.json()) as PaginatedResponse<T>
    if (!response.ok) {
      throw new ApiError(`Request failed with status ${response.status}.`, {
        status: response.status,
        url: nextUrl,
      })
    }
    items.push(...payload.results)
    nextUrl = payload.next
  }

  return { items, count: isPaginatedResponse(first) ? first.count : items.length }
}
