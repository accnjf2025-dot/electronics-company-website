import {
  Award,
  Building2,
  Eye,
  Handshake,
  Lightbulb,
  Package,
  Target,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'
import {
  CorporatePageHero,
  CorporateSectionHeader,
  InfoPanel,
  ValueCard,
} from '@/components/corporate'
import { companyProfile } from '@/data/company'
import { ImageWithFallback } from '@/components/common'
import { useTranslation } from '@/utils'

const valueIcons = [Award, Handshake, Users, Lightbulb]

export function IdentityPage() {
  const { t, locale } = useTranslation()
  const identity = t.identity
  const corporate = t.corporate.identity
  const logoAlt = locale === 'ar' ? companyProfile.logoAltAr : companyProfile.logoAltEn

  return (
    <>
      <CorporatePageHero title={t.pages.identity.title} description={t.pages.identity.subtitle} />

      <section className="overflow-x-hidden bg-surface-50 py-10 md:py-12">
        <div className="container-main mx-auto max-w-6xl space-y-10 md:space-y-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <CorporateSectionHeader title={corporate.overviewHeading} />
              <p className="mt-4 max-w-2xl text-base leading-[1.7] text-text-secondary">{identity.intro}</p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="flex h-24 w-48 items-center justify-center rounded-2xl border border-surface-200 bg-white p-6 shadow-soft">
                <ImageWithFallback
                  src={companyProfile.logoPath}
                  alt={logoAlt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div>
            <CorporateSectionHeader title={corporate.visionMissionHeading} />
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <article className="rounded-xl border border-brand-navy/15 bg-brand-navy p-6 text-white shadow-soft md:p-7">
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-brand-yellow text-brand-navy">
                  <Eye className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold">{t.common.ourVision}</h3>
                <p className="mt-3 max-w-prose text-sm leading-[1.7] text-white/80">{identity.vision}</p>
              </article>
              <article className="rounded-xl border border-surface-200 bg-white p-6 shadow-soft md:p-7">
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-brand-yellow/15 text-brand-navy">
                  <Target className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">{t.common.ourMission}</h3>
                <p className="mt-3 max-w-prose text-sm leading-[1.7] text-text-secondary">{identity.mission}</p>
              </article>
            </div>
          </div>

          <div>
            <CorporateSectionHeader title={corporate.valuesHeading} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {identity.values.map((value, index) => {
                const Icon = valueIcons[index] ?? Award
                return <ValueCard key={value.title} icon={Icon} title={value.title} description={value.description} />
              })}
            </div>
          </div>

          <div>
            <CorporateSectionHeader title={corporate.whoWeServeHeading} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {corporate.whoWeServe.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-surface-200 bg-white p-5 shadow-soft"
                >
                  <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                    <Building2 className="size-4" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-brand-navy">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-text-secondary">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <CorporateSectionHeader title={corporate.coverageHeading} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoPanel icon={Truck} label={corporate.coverageItems[0].title}>
                {corporate.coverageItems[0].description}
              </InfoPanel>
              <InfoPanel icon={Wrench} label={corporate.coverageItems[1].title}>
                {corporate.coverageItems[1].description}
              </InfoPanel>
              <InfoPanel icon={Package} label={corporate.coverageItems[2].title}>
                {corporate.coverageItems[2].description}
              </InfoPanel>
              <InfoPanel icon={Handshake} label={corporate.coverageItems[3].title}>
                {corporate.coverageItems[3].description}
              </InfoPanel>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">{identity.coverage}</p>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{identity.installation}</p>
          </div>
        </div>
      </section>
    </>
  )
}
