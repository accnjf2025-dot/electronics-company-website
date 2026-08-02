import { CorporateBreadcrumb } from './CorporateBreadcrumb'

interface CorporatePageHeroProps {
  title: string
  description?: string
}

export function CorporatePageHero({ title, description }: CorporatePageHeroProps) {
  return (
    <section className="gradient-navy text-white">
      <div className="container-main px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <CorporateBreadcrumb current={title} />
          <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight md:text-3xl md:leading-tight lg:text-4xl">{title}</h1>
          {description && (
            <p className="mt-2 text-base leading-relaxed text-white/80 md:text-lg">{description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
