import { createContext } from 'react'
import type { CompanyProfile } from '@/types/company'
import type { DataSource } from '@/lib/api/types'

export interface CompanyProfileContextValue {
  company: CompanyProfile | null
  loading: boolean
  error: unknown
  source: DataSource | null
  retry: () => void
}

export const CompanyProfileContext = createContext<CompanyProfileContextValue | null>(null)
