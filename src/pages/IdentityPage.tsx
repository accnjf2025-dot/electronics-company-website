import {
  Building2,
  Eye,
  Handshake,
  Package,
  Target,
  Truck,
  Wrench,
} from 'lucide-react'
import {
  CorporateErrorState,
  CorporatePageHero,
  CorporateSectionHeader,
  CorporateSectionSkeleton,
  InfoPanel,
  ValueCard,
} from '@/components/corporate'
import { ImageWithFallback } from '@/components/common'
import { useCompanyValues } from '@/hooks/api'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import { pickLocalized, useTranslation } from '@/utils'

export function IdentityPage() {
  const { t, locale } = useTranslation()
  const corporate = t.corporate.identity
  const {
    intro,
    vision,
    mission,
    coverage,
    installationArea,
    logoPath,
    logoAlt,
    loading: companyLoading,
    error: companyError,
    hasCompany,
    retry: retryCompany,
  } = useCompanyContent()
  const {
    values,
    loading: valuesLoading,
    error: valuesError,
    hasValues,
    retry: retryValues,
  } = useCompanyValues()

  const showCompanyError = companyError && !hasCompany && !companyLoading
  const showValuesError = valuesError && !hasValues && !valuesLoading

  return (
    <>
      <CorporatePageHero title={t.pages.identity.title} description={t.pages.identity.subtitle} />

      <section className="overflow-x-hidden bg-surface-50 py-10 md:py-12">
        <div className="container-main mx-auto max-w-6xl space-y-10 md:space-y-12">
          {showCompanyError ? (
            <CorporateErrorState
              title={t.corporate.companyUnavailableTitle}
              description={t.corporate.companyUnavailableDescription}
              retryLabel={t.corporate.tryAgain}
              onRetry={retryCompany}
            />
          ) : (
            <>
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <CorporateSectionHeader title={corporate.overviewHeading} />
                  {companyLoading ? (
                    <CorporateSectionSkeleton rows={2} />
                  ) : (
                    intro && (
                      <p className="mt-4 max-w-2xl text-base leading-[1.7] text-text-secondary">{intro}</p>
                    )
                  )}
                </div>
                <div className="flex justify-center lg:justify-end">
                  <div className="flex h-24 w-48 items-center justify-center rounded-2xl border border-surface-200 bg-white p-6 shadow-soft">
                    <ImageWithFallback
                      src={logoPath}
                      alt={logoAlt}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div>
                <CorporateSectionHeader title={corporate.visionMissionHeading} />
                {companyLoading ? (
                  <CorporateSectionSkeleton rows={2} />
                ) : (
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <article className="rounded-xl border border-brand-navy/15 bg-brand-navy p-6 text-white shadow-soft md:p-7">
                      <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-brand-yellow text-brand-navy">
                        <Eye className="size-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-bold">{t.common.ourVision}</h3>
                      {vision && (
                        <p className="mt-3 max-w-prose text-sm leading-[1.7] text-white/80">{vision}</p>
                      )}
                    </article>
                    <article className="rounded-xl border border-surface-200 bg-white p-6 shadow-soft md:p-7">
                      <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-brand-yellow/15 text-brand-navy">
                        <Target className="size-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-bold text-brand-navy">{t.common.ourMission}</h3>
                      {mission && (
                        <p className="mt-3 max-w-prose text-sm leading-[1.7] text-text-secondary">{mission}</p>
                      )}
                    </article>
                  </div>
                )}
              </div>
            </>
          )}

          <div>
            <CorporateSectionHeader title={corporate.valuesHeading} />
            {showValuesError ? (
              <CorporateErrorState
                title={t.corporate.apiLoadCompanyError}
                description={t.corporate.apiConnectionError}
                retryLabel={t.corporate.tryAgain}
                onRetry={retryValues}
              />
            ) : valuesLoading ? (
              <CorporateSectionSkeleton rows={4} />
            ) : hasValues ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {values.map((value) => {
                  const Icon = value.icon
                  return (
                    <ValueCard
                      key={value.id}
                      icon={Icon}
                      title={pickLocalized(value, 'title', locale)}
                      description={pickLocalized(value, 'description', locale)}
                    />
                  )
                })}
              </div>
            ) : null}
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
            {coverage && (
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">{coverage}</p>
            )}
            {installationArea && (
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{installationArea}</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
