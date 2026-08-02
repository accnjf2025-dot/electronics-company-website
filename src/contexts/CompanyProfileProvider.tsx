import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { companyProfile as mockCompanyProfile } from '@/data/company'
import { CompanyProfileContext } from '@/contexts/company-profile-context'
import { shouldUseMockFallback } from '@/lib/api/fallback'
import { fetchCompanyProfile } from '@/lib/api/corporate'
import type { DataSource } from '@/lib/api/types'
import type { CompanyProfile } from '@/types/company'

interface CompanyProfileProviderProps {
  children: ReactNode
}

export function CompanyProfileProvider({ children }: CompanyProfileProviderProps) {
  const [company, setCompany] = useState<CompanyProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [source, setSource] = useState<DataSource | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchCompanyProfile(controller.signal)
        if (!active) return
        setCompany(data)
        setSource('api')
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === 'AbortError')) return
        if (shouldUseMockFallback()) {
          setCompany(mockCompanyProfile)
          setSource('mock')
          setError(null)
        } else {
          setCompany(null)
          setSource('api')
          setError(err)
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

  const value = useMemo(
    () => ({ company, loading, error, source, retry }),
    [company, loading, error, source, retry],
  )

  return <CompanyProfileContext.Provider value={value}>{children}</CompanyProfileContext.Provider>
}
