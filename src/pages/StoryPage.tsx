import { Link } from 'react-router-dom'
import { ClipboardList, Ear, Headphones, Package, Settings, TrendingUp } from 'lucide-react'
import {
  CorporatePageHero,
  CorporateSectionHeader,
  ValueCard,
} from '@/components/corporate'
import { companyProfile } from '@/data/company'
import { ROUTES } from '@/routes/paths'
import { ImageWithFallback } from '@/components/common'
import { useTranslation } from '@/utils'

const definesIcons = [Ear, Package, Settings, TrendingUp]
const approachIcons = [Ear, ClipboardList, Package, Settings, Headphones]

export function StoryPage() {
  const { t, locale } = useTranslation()
  const story = t.corporate.story
  const paragraphs = t.story.content.split('\n\n')
  const lead = paragraphs[0] ?? ''
  const rest = paragraphs.slice(1)
  const logoAlt = locale === 'ar' ? companyProfile.logoAltAr : companyProfile.logoAltEn

  return (
    <>
      <CorporatePageHero title={t.pages.story.title} description={t.pages.story.subtitle} />

      <section className="overflow-x-hidden bg-surface-50 py-10 md:py-12">
        <div className="container-main mx-auto max-w-6xl space-y-10 md:space-y-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
            <article className="rounded-xl border border-surface-200 bg-white p-6 shadow-soft md:p-8">
              <p className="text-lg font-medium leading-relaxed text-brand-navy md:text-xl">{lead}</p>
              {rest.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-5 text-sm leading-[1.75] text-text-secondary md:text-base">
                  {paragraph}
                </p>
              ))}
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-xl border border-brand-navy/10 bg-brand-navy p-6 text-center shadow-soft">
                <ImageWithFallback
                  src={companyProfile.logoPath}
                  alt={logoAlt}
                  className="mx-auto max-h-14 object-contain"
                />
                <div className="mt-4 h-px bg-white/15" aria-hidden="true" />
                <p className="mt-4 text-sm leading-relaxed text-white/70">{t.company.tagline}</p>
              </div>
            </aside>
          </div>

          <div>
            <CorporateSectionHeader title={story.definesUsHeading} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {story.definesUs.map((item, index) => {
                const Icon = definesIcons[index] ?? TrendingUp
                return <ValueCard key={item.title} icon={Icon} title={item.title} description={item.description} />
              })}
            </div>
          </div>

          <div>
            <CorporateSectionHeader title={story.approachHeading} />
            <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {story.approachSteps.map((step, index) => {
                const Icon = approachIcons[index] ?? Settings
                return (
                  <li
                    key={step.title}
                    className="flex flex-col items-center rounded-xl border border-surface-200 bg-white p-4 text-center shadow-soft"
                  >
                    <div className="flex size-10 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-navy">
                      <Icon className="size-4" aria-hidden="true" />
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-brand-navy">{step.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">{step.description}</p>
                  </li>
                )
              })}
            </ol>
          </div>

          <section className="rounded-xl border border-surface-200 bg-white p-6 shadow-soft md:p-8">
            <h2 className="text-xl font-bold text-brand-navy">{story.ctaHeading}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to={ROUTES.services}
                className="inline-flex rounded-lg gradient-accent px-5 py-2.5 text-sm font-semibold text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              >
                {story.ctaServices}
              </Link>
              <Link
                to={ROUTES.products}
                className="inline-flex rounded-lg border border-surface-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-yellow/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              >
                {story.ctaProducts}
              </Link>
              <Link
                to={ROUTES.contact}
                className="inline-flex rounded-lg border border-surface-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-yellow/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              >
                {story.ctaContact}
              </Link>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
