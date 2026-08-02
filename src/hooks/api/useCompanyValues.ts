import { useCallback, useEffect, useMemo, useState } from 'react'
import { shouldUseMockFallback } from '@/lib/api/fallback'
import { fetchCompanyValues } from '@/lib/api/corporate'
import type { DataSource } from '@/lib/api/types'
import type { CompanyValue } from '@/types/company'

const EMPTY_VALUES: CompanyValue[] = []

export function useCompanyValues() {
  const [values, setValues] = useState<CompanyValue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [source, setSource] = useState<DataSource>('api')
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchCompanyValues(controller.signal)
        if (!active) return
        setValues(data)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          const { getMockCompanyValues } = await import('@/lib/api/mappers/corporate')
          setValues(getMockCompanyValues())
          setSource('mock')
          setError(null)
        } else {
          setError(err)
          setValues(EMPTY_VALUES)
          setSource('api')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()
    return () => {
      active = false
      controller.abort()
    }
  }, [reloadKey])

  return useMemo(
    () => ({ values, loading, error, source, retry, hasValues: values.length > 0 }),
    [values, loading, error, source, retry],
  )
}
