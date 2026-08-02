import type { Product } from '@/types'
import { getRelatedProducts } from '@/utils/products'
import { useTranslation } from '@/utils'
import { ProductGrid } from './ProductGrid'

interface RelatedProductsProps {
  product: Product
}

export function RelatedProducts({ product }: RelatedProductsProps) {
  const { t } = useTranslation()
  const related = getRelatedProducts(product, 4)

  if (related.length === 0) return null

  return (
    <section>
      <h2 className="mb-6 text-xl font-bold text-brand-navy md:text-2xl">
        {t.catalog.relatedProducts}
      </h2>
      <ProductGrid products={related} />
    </section>
  )
}
