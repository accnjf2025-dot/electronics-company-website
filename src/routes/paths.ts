export const ROUTES = {
  home: '/',
  identity: '/identity',
  story: '/story',
  products: '/products',
  services: '/services',
  productDetails: (slug: string) => `/products/${slug}`,
  projects: '/projects',
  projectDetails: (slug: string) => `/projects/${slug}`,
  partners: '/partners',
  contact: '/contact',
} as const

export type RouteKey = keyof typeof ROUTES
