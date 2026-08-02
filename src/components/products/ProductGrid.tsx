import type { Product } from '@/types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] justify-items-start gap-5 2xl:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
      {products.map((product) => (
        <li key={product.id} className="w-full xl:max-w-[360px]">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
