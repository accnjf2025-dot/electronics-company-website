import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import {
  HomePage,
  IdentityPage,
  StoryPage,
  ProductsPage,
  ProductDetailsPage,
  ServicesPage,
  ProjectsPage,
  ProjectDetailsPage,
  PartnersPage,
  ContactPage,
  NotFoundPage,
} from '@/pages'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="identity" element={<IdentityPage />} />
        <Route path="story" element={<StoryPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productSlug" element={<ProductDetailsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:projectSlug" element={<ProjectDetailsPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
