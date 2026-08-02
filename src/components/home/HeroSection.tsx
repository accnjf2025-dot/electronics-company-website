import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  BadgeCheck,
  Battery,
  Camera,
  Home,
  Radio,
  Speaker,
  Wifi,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ROUTES } from '@/routes/paths'
import { useTranslation } from '@/utils'
import { DirectionalArrow } from '@/components/common'

interface DeviceCardConfig {
  id: string
  Icon: LucideIcon
  labelKey: 'cameras' | 'audio' | 'communications' | 'internet' | 'power'
  position: string
  delay: number
}

const floatingDevices: DeviceCardConfig[] = [
  { id: 'cameras', Icon: Camera, labelKey: 'cameras', position: 'start-[4%] top-[8%]', delay: 0.05 },
  { id: 'audio', Icon: Speaker, labelKey: 'audio', position: 'end-[4%] top-[10%]', delay: 0.12 },
  { id: 'communications', Icon: Radio, labelKey: 'communications', position: 'start-[6%] top-[42%]', delay: 0.18 },
  { id: 'internet', Icon: Wifi, labelKey: 'internet', position: 'end-[5%] top-[40%]', delay: 0.24 },
  { id: 'power', Icon: Battery, labelKey: 'power', position: 'start-[10%] bottom-[14%]', delay: 0.3 },
]

function DeviceCard({
  Icon,
  label,
  position,
  delay,
  reducedMotion,
}: {
  Icon: LucideIcon
  label: string
  position: string
  delay: number
  reducedMotion: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.35 + delay, duration: 0.45, ease: 'easeOut' }}
      className={`absolute ${position} z-10`}
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
        transition={reducedMotion ? undefined : { duration: 4 + delay * 2, repeat: Infinity, ease: 'easeInOut' }}
        className="flex min-w-[72px] flex-col items-center gap-1.5 rounded-xl border border-white/15 bg-brand-navy/85 px-2.5 py-2 shadow-soft backdrop-blur-sm sm:min-w-[80px] sm:px-3 sm:py-2.5"
      >
        <div className="flex size-8 items-center justify-center rounded-lg bg-brand-yellow/15 sm:size-9">
          <Icon className="size-4 text-brand-yellow sm:size-[18px]" aria-hidden="true" />
        </div>
        <span className="text-[10px] font-medium text-white/85 sm:text-xs">{label}</span>
      </motion.div>
    </motion.div>
  )
}

function HeroVisual() {
  const { t } = useTranslation()
  const hero = t.home.hero
  const reducedMotion = useReducedMotion() ?? false
  const devices = hero.visualDevices

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="absolute inset-4 rounded-2xl bg-brand-blue/20 blur-3xl" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-navy/90 via-brand-navy/75 to-brand-navy/90 shadow-elevated">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />

        <div className="relative aspect-[4/3] min-h-[240px] sm:min-h-[280px]">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-brand-blue/10" aria-hidden="true" />

          {/* Central smart-home panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="absolute start-1/2 top-1/2 z-20 w-[44%] max-w-[180px] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="rounded-2xl border border-brand-yellow/25 bg-brand-navy/90 p-4 shadow-card backdrop-blur-sm sm:p-5">
              <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-yellow/20 to-brand-blue/20 sm:size-16">
                <Home className="size-7 text-brand-yellow sm:size-8" aria-hidden="true" />
              </div>
              <p className="mt-3 text-center text-xs font-semibold text-white sm:text-sm">
                {devices.smartHome}
              </p>
              <p className="mt-1 text-center text-[10px] text-white/50 sm:text-xs">{hero.visualCaption}</p>
            </div>
          </motion.div>

          {floatingDevices.map(({ id, Icon, labelKey, position, delay }) => (
            <DeviceCard
              key={id}
              Icon={Icon}
              label={devices[labelKey]}
              position={position}
              delay={delay}
              reducedMotion={reducedMotion}
            />
          ))}

          <div className="absolute inset-x-4 bottom-4 z-20 rounded-lg border border-white/10 bg-brand-navy/85 px-3 py-2.5 backdrop-blur-sm sm:inset-x-5 sm:bottom-5 sm:px-4">
            <p className="text-center text-[11px] leading-relaxed text-white/75 sm:text-xs">
              {hero.visualSectors}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

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
            <h1 className="text-[clamp(1.625rem,2.2vw+1rem,2.875rem)] font-bold leading-[1.2] tracking-tight text-white lg:leading-[1.15]">
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
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
