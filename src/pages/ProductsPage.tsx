import { useState } from 'react'
import {
  CategoryNav,
  ProductGrid,
  ProductsEmptyState,
  ProductsFilterDrawer,
  ProductsFilters,
  ProductsPageHero,
  ProductsToolbar,
} from '@/components/products'
import { useProductFilters } from '@/hooks'
import { useTranslation } from '@/utils'
import { getUniqueBrands } from '@/utils/products'

export function ProductsPage() {
  const { t } = useTranslation()
  const { filters, filteredProducts, setFilter, clearFilters } = useProductFilters()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [filterResetKey, setFilterResetKey] = useState(0)
  const brands = getUniqueBrands()

  const handleClearFilters = () => {
    clearFilters()
    setFilterResetKey((key) => key + 1)
  }

  return (
    <>
      <ProductsPageHero />

      <section className="overflow-x-hidden bg-surface-50">
        <div className="container-main px-4 py-8 sm:px-6 md:py-10 lg:px-8">
          <CategoryNav
            filters={filters}
            onCategoryChange={(slug) => setFilter('category', slug)}
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(230px,260px)_minmax(0,1fr)] lg:gap-8">
            <aside className="hidden min-w-0 lg:block">
              <div className="sticky top-20 rounded-xl border border-surface-200 bg-white p-5 shadow-soft">
                <h2 className="mb-4 text-base font-bold text-brand-navy">
                  {t.catalog.filters}
                </h2>
                <ProductsFilters
                  filters={filters}
                  brands={brands}
                  onFilterChange={setFilter}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>

            <div className="min-w-0">
              <ProductsToolbar
                filters={filters}
                resultCount={filteredProducts.length}
                onSearchChange={(search) => setFilter('search', search)}
                onSortChange={(sort) => setFilter('sort', sort)}
                onOpenFilters={() => setDrawerOpen(true)}
                resetKey={filterResetKey}
              />

              {filteredProducts.length === 0 ? (
                <ProductsEmptyState onClearFilters={handleClearFilters} />
              ) : (
                <ProductGrid products={filteredProducts} />
              )}
            </div>
          </div>
        </div>
      </section>

      <ProductsFilterDrawer
        open={drawerOpen}
        filters={filters}
        brands={brands}
        onClose={() => setDrawerOpen(false)}
        onFilterChange={setFilter}
        onClearFilters={handleClearFilters}
        onApply={() => setDrawerOpen(false)}
      />
    </>
  )
}
