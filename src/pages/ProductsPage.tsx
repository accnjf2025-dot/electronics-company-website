import { useState } from 'react'
import {
  CategoryNav,
  CategoryNavSkeleton,
  ProductGrid,
  ProductGridSkeleton,
  ProductsEmptyState,
  ProductsErrorState,
  ProductsFilterDrawer,
  ProductsFilters,
  ProductsPageHero,
  ProductsToolbar,
} from '@/components/products'
import { useBrandOptions, useProductCategories, useProducts } from '@/hooks/api'
import { useProductFilters } from '@/hooks'
import { useTranslation } from '@/utils'

export function ProductsPage() {
  const { t } = useTranslation()
  const { filters, setFilter, clearFilters } = useProductFilters()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [filterResetKey, setFilterResetKey] = useState(0)

  const {
    categories,
    loading: categoriesLoading,
    retry: retryCategories,
  } = useProductCategories()
  const {
    brandNames,
    resolveBrandSlug,
    retry: retryBrands,
  } = useBrandOptions()
  const {
    products,
    count,
    loading: productsLoading,
    error: productsError,
    retry: retryProducts,
  } = useProducts({ filters, resolveBrandSlug })

  const handleClearFilters = () => {
    clearFilters()
    setFilterResetKey((key) => key + 1)
  }

  const handleRetryAll = () => {
    retryCategories()
    retryBrands()
    retryProducts()
  }

  const showGridSkeleton = productsLoading && products.length === 0
  const showCategorySkeleton = categoriesLoading && categories.length === 0
  const resultCount = productsLoading ? 0 : count

  return (
    <>
      <ProductsPageHero />

      <section className="overflow-x-hidden bg-surface-50">
        <div className="container-main px-4 py-8 sm:px-6 md:py-10 lg:px-8">
          {showCategorySkeleton ? (
            <CategoryNavSkeleton />
          ) : (
            <CategoryNav
              filters={filters}
              categories={categories}
              onCategoryChange={(slug) => setFilter('category', slug)}
            />
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(230px,260px)_minmax(0,1fr)] lg:gap-8">
            <aside className="hidden min-w-0 lg:block">
              <div className="sticky top-20 rounded-xl border border-surface-200 bg-white p-5 shadow-soft">
                <h2 className="mb-4 text-base font-bold text-brand-navy">
                  {t.catalog.filters}
                </h2>
                <ProductsFilters
                  filters={filters}
                  brands={brandNames}
                  onFilterChange={setFilter}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>

            <div className="min-w-0">
              <ProductsToolbar
                filters={filters}
                resultCount={resultCount}
                onSearchChange={(search) => setFilter('search', search)}
                onSortChange={(sort) => setFilter('sort', sort)}
                onOpenFilters={() => setDrawerOpen(true)}
                resetKey={filterResetKey}
              />

              {productsError ? (
                <ProductsErrorState
                  title={t.catalog.apiLoadError}
                  description={t.catalog.apiConnectionError}
                  retryLabel={t.catalog.tryAgain}
                  onRetry={handleRetryAll}
                />
              ) : showGridSkeleton ? (
                <ProductGridSkeleton />
              ) : products.length === 0 ? (
                <ProductsEmptyState onClearFilters={handleClearFilters} />
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </div>
        </div>
      </section>

      <ProductsFilterDrawer
        open={drawerOpen}
        filters={filters}
        brands={brandNames}
        onClose={() => setDrawerOpen(false)}
        onFilterChange={setFilter}
        onClearFilters={handleClearFilters}
        onApply={() => setDrawerOpen(false)}
      />
    </>
  )
}
