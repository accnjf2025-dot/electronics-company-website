import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CompanyProfileProvider } from '@/contexts/CompanyProfileProvider'
import { LocaleProvider } from '@/contexts/LocaleProvider'
import { AppRoutes } from '@/routes/AppRoutes'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <CompanyProfileProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CompanyProfileProvider>
    </LocaleProvider>
  </StrictMode>,
)
