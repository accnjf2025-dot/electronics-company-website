import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/common'
import { CategoryCard } from '@/components/products'
import { productCategories } from '@/data'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

export function ProductCategoriesSection() {
  const { t } = useTranslation()
  const section = t.home.categories

  return (
    <section className="section-padding bg-surface-50">
      <div className="container-main">
        <SectionHeader
          label={section.label}
          title={section.heading}
          subtitle={section.subtitle}
          actionLabel={t.common.viewAll}
          actionTo={ROUTES.products}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
