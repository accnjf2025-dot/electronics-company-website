import { motion, useReducedMotion } from 'framer-motion'
import {
  Camera,
  Home,
  Lock,
  Radio,
  Speaker,
  Sun,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from '@/utils'

type SolutionKey =
  | 'surveillance'
  | 'audio'
  | 'solar'
  | 'smartHome'
  | 'hotelLocks'
  | 'communications'

interface SolutionNodeConfig {
  id: SolutionKey
  Icon: LucideIcon
  accent: 'yellow' | 'blue'
}

const topRow: SolutionNodeConfig[] = [
  { id: 'audio', Icon: Speaker, accent: 'blue' },
  { id: 'surveillance', Icon: Camera, accent: 'yellow' },
  { id: 'communications', Icon: Radio, accent: 'yellow' },
]

const middleRow = [
  { id: 'solar' as const, Icon: Sun, accent: 'blue' as const },
  { id: 'smartHome' as const, Icon: Home, accent: 'yellow' as const },
]

const bottomRow: SolutionNodeConfig[] = [{ id: 'hotelLocks', Icon: Lock, accent: 'blue' }]

function SolutionNode({
  Icon,
  label,
  accent,
  delay,
  reducedMotion,
  compact = false,
}: {
  Icon: LucideIcon
  label: string
  accent: 'yellow' | 'blue'
  delay: number
  reducedMotion: boolean
  compact?: boolean
}) {
  const iconWrap =
    accent === 'yellow'
      ? 'bg-brand-yellow text-brand-navy'
      : 'bg-brand-blue text-white'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2 + delay, duration: 0.45, ease: 'easeOut' }}
      whileHover={reducedMotion ? undefined : { y: -2, scale: 1.02 }}
      className={`group/node flex h-full w-full flex-col items-center justify-center rounded-xl border border-white/20 bg-brand-navy shadow-soft backdrop-blur-md transition-shadow hover:border-brand-yellow/35 hover:shadow-card ${
        compact ? 'gap-1.5 px-2.5 py-2.5' : 'gap-2 px-2.5 py-3 sm:px-3 sm:py-3.5'
      }`}
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-lg shadow-sm ${iconWrap} ${
          compact ? 'size-9 sm:size-10' : 'size-10 sm:size-11'
        }`}
      >
        <Icon className={compact ? 'size-5' : 'size-5 sm:size-[22px]'} aria-hidden="true" />
      </div>
      <span
        className={`w-full text-center font-semibold leading-snug text-white ${
          compact ? 'text-[10px] sm:text-[11px]' : 'text-[11px] sm:text-xs'
        }`}
      >
        {label}
      </span>
    </motion.div>
  )
}

function CapabilityStrip({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-white/15 bg-brand-navy px-3 py-2.5 sm:px-4 sm:py-3">
      <p className="text-center text-[10px] font-medium leading-relaxed text-white/90 sm:text-[11px]">
        {text}
      </p>
    </div>
  )
}

function Hub({ title, reducedMotion, compact = false }: { title: string; reducedMotion: boolean; compact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="relative z-20 flex h-full w-full items-center justify-center"
    >
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                boxShadow: [
                  '0 0 0 0 rgba(244,196,0,0.2)',
                  '0 0 28px 6px rgba(244,196,0,0.18)',
                  '0 0 0 0 rgba(244,196,0,0.2)',
                ],
              }
        }
        transition={reducedMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`w-full rounded-2xl border-2 border-brand-yellow/45 bg-brand-navy shadow-elevated ${
          compact ? 'px-4 py-3.5' : 'px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-5'
        }`}
      >
        <div
          className={`mx-auto mb-2.5 flex items-center justify-center rounded-xl bg-brand-yellow sm:mb-3 ${
            compact ? 'size-11' : 'size-12 sm:size-14'
          }`}
        >
          <div
            className={`rounded-full bg-brand-navy ${compact ? 'size-4' : 'size-4 sm:size-5'}`}
            aria-hidden="true"
          />
        </div>
        <p
          className={`mx-auto text-center font-bold leading-snug text-white ${
            compact ? 'max-w-[10rem] text-xs' : 'max-w-[11rem] text-xs sm:max-w-[13rem] sm:text-sm lg:text-[0.9375rem]'
          }`}
        >
          {title}
        </p>
      </motion.div>
    </motion.div>
  )
}

function DesktopEcosystem({
  solutions,
  hubTitle,
  capabilities,
  reducedMotion,
}: {
  solutions: Record<SolutionKey, string>
  hubTitle: string
  capabilities: string
  reducedMotion: boolean
}) {
  let step = 0

  return (
    <div className="relative hidden md:flex md:flex-col md:gap-3 md:p-5 lg:gap-3.5 lg:p-6">
      <div
        className="pointer-events-none absolute inset-5 bottom-[4.5rem] rounded-full bg-[radial-gradient(circle,rgba(19,86,184,0.18),transparent_70%)] lg:inset-6 lg:bottom-[5rem]"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-3 gap-2.5 lg:gap-3">
        {topRow.map(({ id, Icon, accent }) => (
          <SolutionNode
            key={id}
            Icon={Icon}
            label={solutions[id]}
            accent={accent}
            delay={step++ * 0.05}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-3 items-stretch gap-2.5 lg:gap-3">
        {middleRow.slice(0, 1).map(({ id, Icon, accent }) => (
          <SolutionNode
            key={id}
            Icon={Icon}
            label={solutions[id]}
            accent={accent}
            delay={step++ * 0.05}
            reducedMotion={reducedMotion}
          />
        ))}
        <Hub title={hubTitle} reducedMotion={reducedMotion} />
        {middleRow.slice(1).map(({ id, Icon, accent }) => (
          <SolutionNode
            key={id}
            Icon={Icon}
            label={solutions[id]}
            accent={accent}
            delay={step++ * 0.05}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-2.5 lg:gap-3">
        <div aria-hidden="true" />
        {bottomRow.map(({ id, Icon, accent }) => (
          <SolutionNode
            key={id}
            Icon={Icon}
            label={solutions[id]}
            accent={accent}
            delay={step++ * 0.05}
            reducedMotion={reducedMotion}
          />
        ))}
        <div aria-hidden="true" />
      </div>

      <div className="relative z-10 mt-1">
        <CapabilityStrip text={capabilities} />
      </div>
    </div>
  )
}

export function HeroEcosystemVisual() {
  const { t } = useTranslation()
  const hero = t.home.hero
  const solutions = hero.visualSolutions
  const reducedMotion = useReducedMotion() ?? false

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div className="absolute inset-3 rounded-2xl bg-brand-blue/25 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-6 rounded-full bg-brand-yellow/10 blur-2xl" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy shadow-elevated">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        {/* Mobile: compact grid */}
        <div className="relative flex flex-col gap-4 p-4 sm:p-5 md:hidden">
          <div className="flex justify-center">
            <div className="w-full max-w-[16rem]">
              <Hub title={hero.visualHub} reducedMotion={reducedMotion} compact />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[...topRow, ...middleRow, ...bottomRow].map(({ id, Icon, accent }, index) => (
              <SolutionNode
                key={id}
                Icon={Icon}
                label={solutions[id]}
                accent={accent}
                delay={index * 0.05}
                reducedMotion={reducedMotion}
                compact
              />
            ))}
          </div>
          <CapabilityStrip text={hero.visualCapabilities} />
        </div>

        {/* Desktop / tablet: structured grid */}
        <DesktopEcosystem
          solutions={solutions}
          hubTitle={hero.visualHub}
          capabilities={hero.visualCapabilities}
          reducedMotion={reducedMotion}
        />
      </div>
    </div>
  )
}
