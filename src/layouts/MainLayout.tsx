import { Outlet } from 'react-router-dom'
import {
  AnnouncementBar,
  ScrollToTopButton,
  WhatsAppButton,
} from '@/components/common'
import { Header, Footer } from '@/components/layout'
import { useScrollToTop } from '@/hooks'

export function MainLayout() {
  useScrollToTop()

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
      <WhatsAppButton />
    </div>
  )
}
