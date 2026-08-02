import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import { DirectionalArrow } from '@/components/common'
import { HeroEcosystemVisual } from '@/components/home/HeroEcosystemVisual'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'

export function HeroSection() {
  const { t, locale } = useTranslation()
  const hero = t.home.hero
  const reducedMotion = useReducedMotion() ?? false
  const slideOffset = locale === 'ar' ? -20 : 20

  return (
    <section className="relative overflow-hidden gradient-navy">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />
      <div className="absolute start-1/4 top-0 size-72 rounded-full bg-brand-yellow/10 blur-3xl sm:size-96" aria-hidden="true" />

      <div className="container-main relative py-12 md:py-14 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className={`order-1 ${locale === 'en' ? 'max-w-xl lg:max-w-lg xl:max-w-2xl' : 'max-w-xl lg:max-w-md xl:max-w-xl'}`}
          >
            <h1 className="text-[clamp(1.625rem,2.2vw+1rem,2.875rem)] font-extrabold leading-[1.25] tracking-tight text-white lg:leading-[1.2]">
              {hero.headline}
            </h1>
            <p className="mt-4 max-w-prose text-[clamp(0.9375rem,0.5vw+0.85rem,1.125rem)] leading-relaxed text-white/75">
              {hero.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={ROUTES.products}
                className="inline-flex items-center justify-center gap-2 rounded-lg gradient-accent px-5 py-2.5 text-sm font-semibold text-brand-navy shadow-soft transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow sm:px-6 sm:py-3"
              >
                {hero.ctaProducts}
                <DirectionalArrow className="size-4" />
              </Link>
              <Link
                to={ROUTES.services}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-brand-yellow/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow sm:px-6 sm:py-3"
              >
                {hero.ctaServices}
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5 sm:gap-x-6">
              {hero.trustIndicators.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                  <BadgeCheck className="size-4 shrink-0 text-brand-yellow" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: slideOffset }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="order-2"
          >
            <HeroEcosystemVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
