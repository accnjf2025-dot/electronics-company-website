import { motion } from 'framer-motion'
import { CreditCard, Headphones, Layers, ShieldCheck, Truck, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/common'
import { useTranslation } from '@/utils'

const iconMap: LucideIcon[] = [ShieldCheck, Wrench, Truck, Headphones, CreditCard, Layers]

export function WhyChooseUsSection() {
  const { t } = useTranslation()
  const section = t.home.whyChooseUs

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <SectionHeader label={section.label} title={section.heading} subtitle={section.subtitle} align="center" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, index) => {
            const Icon = iconMap[index] ?? Layers
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-xl border border-surface-200 bg-surface-50 p-6 shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-brand-navy text-brand-yellow">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-brand-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
