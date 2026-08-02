import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CreditCard, Truck, Users, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { trustHighlights, type TrustHighlight } from '@/data/homeTrustHighlights'
import { parseStatValue, useCountUp } from '@/hooks/useCountUp'
import { pickLocalized, useTranslation } from '@/utils'

const iconMap: Record<TrustHighlight['icon'], LucideIcon> = {
  users: Users,
  truck: Truck,
  wrench: Wrench,
  'credit-card': CreditCard,
}

function StatItem({
  item,
  index,
  isLast,
}: {
  item: TrustHighlight
  index: number
  isLast: boolean
}) {
  const { locale } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const reducedMotion = useReducedMotion() ?? false

  const label = pickLocalized(item, 'label', locale)
  const displayValue = pickLocalized(item, 'value', locale)
  const parsed = displayValue ? parseStatValue(displayValue) : null
  const animatedValue = useCountUp(parsed, inView, 900, locale)
  const supportingText = pickLocalized(item, 'supportingText', locale)

  useEffect(() => {
    const node = containerRef.current
    if (!node || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [inView])

  const Icon = iconMap[item.icon]

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`relative flex flex-col items-center px-4 py-6 text-center sm:px-5 ${
        !isLast ? 'lg:border-e lg:border-white/10' : ''
      }`}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-brand-yellow/25 bg-brand-yellow/15 text-brand-yellow shadow-sm sm:size-14">
        <Icon className="size-6 sm:size-7" aria-hidden="true" />
      </div>

      {parsed ? (
        <>
          <p
            className="text-[clamp(1.75rem,2.5vw,2.75rem)] font-extrabold leading-none text-brand-yellow"
            aria-live={reducedMotion ? 'off' : 'polite'}
          >
            {animatedValue}
          </p>
          <p className="mt-3 max-w-[14rem] text-sm font-semibold leading-snug text-white sm:text-base">{label}</p>
        </>
      ) : (
        <p className="max-w-[15rem] text-[clamp(1.125rem,1.6vw,1.5rem)] font-extrabold leading-snug text-white">
          {label}
        </p>
      )}

      {supportingText && (
        <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-white/65 sm:text-sm">{supportingText}</p>
      )}
    </motion.div>
  )
}

export function StatisticsSection() {
  return (
    <section className="relative overflow-hidden gradient-navy">
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,196,0,0.08),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(19,86,184,0.16),transparent_45%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />

      <div className="container-main relative section-padding">
        <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {trustHighlights.map((item, index) => (
            <StatItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === trustHighlights.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
