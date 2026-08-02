import type { Product } from '@/types'
import { useTranslation } from '@/utils'
import { ProductGrid } from './ProductGrid'
import { ProductGridSkeleton } from './ProductsApiStates'

interface RelatedProductsProps {
  products: Product[]
  loading?: boolean
}

export function RelatedProducts({ products, loading = false }: RelatedProductsProps) {
  const { t } = useTranslation()

  if (loading) {
    return (
      <section>
        <h2 className="mb-6 text-xl font-bold text-brand-navy md:text-2xl">
          {t.catalog.relatedProducts}
        </h2>
        <ProductGridSkeleton count={4} />
      </section>
    )
  }

  if (products.length === 0) return null

  return (
    <section>
      <h2 className="mb-6 text-xl font-bold text-brand-navy md:text-2xl">
        {t.catalog.relatedProducts}
      </h2>
      <ProductGrid products={products} />
    </section>
  )
}
