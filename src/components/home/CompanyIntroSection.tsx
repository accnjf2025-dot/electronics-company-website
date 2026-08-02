import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { DirectionalArrow } from '@/components/common'
import { CompanyIntroVisual } from '@/components/home/CompanyIntroVisual'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

export function CompanyIntroSection() {
  const { t } = useTranslation()
  const intro = t.home.intro
  const { shortDescription, coverage, installationArea, hasCompany, loading } = useCompanyContent()

  if (!loading && !hasCompany) return null

  const description = shortDescription || intro.description
  const facts = [coverage, installationArea].filter(Boolean)

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-brand-blue">{intro.label}</span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl lg:text-4xl">
              {intro.heading}
            </h2>
            {description && (
              <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">{description}</p>
            )}
            {facts.length > 0 && (
              <ul className="mt-6 space-y-3">
                {facts.map((fact) => (
                  <li key={fact} className="flex items-start gap-3 text-sm text-text-primary md:text-base">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-yellow" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>
            )}
            {!facts.length && (
              <ul className="mt-6 space-y-3">
                {intro.facts.map((fact) => (
                  <li key={fact} className="flex items-start gap-3 text-sm text-text-primary md:text-base">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-yellow" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>
            )}
            <Link
              to={ROUTES.identity}
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-brand-navy/10 px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-yellow/50 hover:text-brand-blue"
            >
              {intro.cta}
              <DirectionalArrow className="size-4" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative min-w-0"
          >
            <CompanyIntroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
