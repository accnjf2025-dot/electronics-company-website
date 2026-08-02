export { getApiBaseUrl, getApiOrigin, isApiConfigured, resolveMediaUrl } from './config'
export { ApiError, apiGet, fetchAllPages, isPaginatedResponse, unwrapList } from './client'
export type { PaginatedResponse } from './client'
export type {
  ApiBrandDto,
  ApiCompanyProfileDto,
  ApiCompanyValueDto,
  ApiPartnerDto,
  ApiProductCategoryDto,
  ApiProductDetailDto,
  ApiProductListDto,
  ApiProjectCategoryDto,
  ApiProjectDetailDto,
  ApiProjectListDto,
  ApiServiceDetailDto,
  ApiServiceListDto,
  DataSource,
} from './types'
export {
  fetchCompanyProfile,
  fetchCompanyValues,
  fetchFeaturedPartners,
  fetchFeaturedServices,
  fetchPartners,
  fetchServiceBySlug,
  fetchServices,
} from './corporate'
export {
  buildProductQueryParams,
  fetchBrands,
  fetchFeaturedProducts,
  fetchProductBySlug,
  fetchProductCategories,
  fetchProducts,
  fetchRelatedProducts,
} from './products'
export {
  buildProjectQueryParams,
  fetchFeaturedProjects,
  fetchProjectBySlug,
  fetchProjectCategories,
  fetchProjectLocationOptions,
  fetchProjects,
  fetchRelatedProjects as fetchRelatedPortfolioProjects,
} from './projects'
export {
  applyLocalProductSort,
  buildBrandSlugMap,
  mapProductCategory,
  mapProductDetail,
  mapProductListItem,
} from './mappers/products'
export {
  applyLocalProjectSort,
  buildProjectLocationOptions,
  mapProjectCategory,
  mapProjectDetail,
  mapProjectListItem,
} from './mappers/projects'
export {
  getMockCompanyValues,
  mapCompanyProfile,
  mapCompanyValue,
  mapPartner,
  mapServiceDetail,
  mapServiceListItem,
  resolveCorporateIcon,
} from './mappers/corporate'
export { shouldUseMockFallback, isNotFoundError } from './fallback'
