import { motion } from 'framer-motion'
import { CreditCard, Truck, Users, Wrench } from 'lucide-react'
import { trustHighlights } from '@/data/homeTrustHighlights'
import { pickLocalized, useTranslation } from '@/utils'

const iconMap = {
  users: Users,
  truck: Truck,
  wrench: Wrench,
  'credit-card': CreditCard,
} as const

export function StatisticsSection() {
  const { locale } = useTranslation()

  return (
    <section className="relative overflow-hidden gradient-navy">
      <div className="absolute inset-0 bg-brand-yellow/5" aria-hidden="true" />
      <div className="container-main relative section-padding">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustHighlights.map((item, index) => {
            const Icon = iconMap[item.icon]
            const label = pickLocalized(item, 'label', locale)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-brand-yellow/15 text-brand-yellow">
                  <Icon className="size-7" aria-hidden="true" />
                </div>
                <p className="text-base font-semibold text-white md:text-lg">{label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
