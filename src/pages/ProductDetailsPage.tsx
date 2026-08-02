import { Link, useParams } from 'react-router-dom'
import {
  ProductDetailsSkeleton,
  ProductGallery,
  ProductDetailsTabs,
  ProductInfo,
  ProductServiceHighlights,
  ProductsBreadcrumb,
  ProductsErrorState,
  RelatedProducts,
} from '@/components/products'
import { useProduct, useRelatedProducts } from '@/hooks/api'
import { ROUTES } from '@/routes/paths'
import { pickLocalized, useTranslation } from '@/utils'

export function ProductDetailsPage() {
  const { t, locale } = useTranslation()
  const { productSlug } = useParams<{ productSlug: string }>()
  const { product, loading, error, notFound, retry } = useProduct(productSlug)
  const { related, loading: relatedLoading } = useRelatedProducts(product)

  if (loading) {
    return (
      <>
        <section className="gradient-navy text-white">
          <div className="container-main px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="max-w-4xl animate-pulse">
              <div className="h-8 w-2/3 rounded bg-white/20" />
              <div className="mt-3 h-4 w-40 rounded bg-white/10" />
            </div>
          </div>
        </section>
        <section className="overflow-x-hidden bg-surface-50">
          <div className="container-main px-4 py-8 sm:px-6 md:py-10 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <ProductDetailsSkeleton />
            </div>
          </div>
        </section>
      </>
    )
  }

  if (error) {
    return (
      <>
        <section className="gradient-navy text-white">
          <div className="container-main px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <h1 className="text-2xl font-bold text-white md:text-3xl">{t.pages.productDetails.title}</h1>
          </div>
        </section>
        <section className="bg-surface-50">
          <div className="container-main px-4 py-10 sm:px-6 lg:px-8">
            <ProductsErrorState
              title={t.catalog.apiLoadError}
              description={t.catalog.apiConnectionError}
              retryLabel={t.catalog.tryAgain}
              onRetry={retry}
            />
          </div>
        </section>
      </>
    )
  }

  if (!product || notFound) {
    return (
      <>
        <section className="gradient-navy text-white">
          <div className="container-main px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <h1 className="text-2xl font-bold text-white md:text-3xl">{t.catalog.productNotFound}</h1>
          </div>
        </section>
        <section className="bg-surface-50">
          <div className="container-main px-4 py-10 text-center sm:px-6 lg:px-8">
            <p className="text-text-secondary">{t.common.notFoundDescription}</p>
            <Link
              to={ROUTES.products}
              className="mt-6 inline-flex rounded-lg btn-gini px-6 py-2.5 text-sm font-semibold text-brand-navy"
            >
              {t.catalog.backToProducts}
            </Link>
          </div>
        </section>
      </>
    )
  }

  const name = pickLocalized(product, 'name', locale)
  const pageUrl = `${window.location.origin}${ROUTES.productDetails(product.slug)}`

  return (
    <>
      <section className="gradient-navy text-white">
        <div className="container-main px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{name}</h1>
            <ProductsBreadcrumb current={name} />
          </div>
        </div>
      </section>

      <section className="overflow-x-hidden bg-surface-50">
        <div className="container-main px-4 py-8 sm:px-6 md:py-10 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,11fr)_minmax(0,12fr)] lg:gap-10">
              <ProductGallery product={product} />
              <ProductInfo product={product} pageUrl={pageUrl} />
            </div>

            <div className="mt-8">
              <ProductServiceHighlights product={product} />
            </div>

            <div className="mt-8 rounded-xl border border-surface-200 bg-white p-5 shadow-soft md:p-7">
              <ProductDetailsTabs product={product} />
            </div>

            <div className="mt-10">
              <RelatedProducts products={related} loading={relatedLoading} />
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-surface-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
        <ProductInfo product={product} pageUrl={pageUrl} compact />
      </div>
      <div className="h-28 md:hidden" aria-hidden="true" />
    </>
  )
}
