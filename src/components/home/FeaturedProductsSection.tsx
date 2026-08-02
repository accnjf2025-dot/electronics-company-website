import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/common'
import { ProductCard } from '@/components/products'
import { getFeaturedProducts } from '@/data'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

export function FeaturedProductsSection() {
  const { t } = useTranslation()
  const section = t.home.featuredProducts
  const featuredProducts = getFeaturedProducts()

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <SectionHeader
          label={section.label}
          title={section.heading}
          subtitle={section.subtitle}
          actionLabel={t.common.viewAll}
          actionTo={ROUTES.products}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
