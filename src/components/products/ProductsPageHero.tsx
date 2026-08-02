import { ProductsBreadcrumb } from './ProductsBreadcrumb'
import { useTranslation } from '@/utils'

export function ProductsPageHero() {
  const { t } = useTranslation()

  return (
    <section className="gradient-navy text-white">
      <div className="container-main px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t.pages.products.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/80 md:text-lg">
            {t.pages.products.subtitle}
          </p>
          <ProductsBreadcrumb />
        </div>
      </div>
    </section>
  )
}
