import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export interface ParsedStatValue {
  prefix: string
  number: number
  suffix: string
  decimals: number
}

export function parseStatValue(raw: string): ParsedStatValue | null {
  const value = raw.trim()
  const match = value.match(/^([^\d]*?)([\d][\d,.\s]*)([^\d]*)$/)
  if (!match) return null

  const prefix = match[1] ?? ''
  const numberPart = match[2] ?? ''
  const suffix = match[3] ?? ''
  const normalized = numberPart.replace(/[\s,]/g, '')
  const number = Number(normalized)
  if (!Number.isFinite(number)) return null

  const decimals = normalized.includes('.') ? (normalized.split('.')[1]?.length ?? 0) : 0
  return { prefix, number, suffix, decimals }
}

function formatNumber(value: number, decimals: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

function buildStatText(target: ParsedStatValue, value: number, locale: string): string {
  const intlLocale = locale === 'ar' ? 'ar-IQ' : 'en-IQ'
  return `${target.prefix}${formatNumber(value, target.decimals, intlLocale)}${target.suffix}`
}

export function useCountUp(
  target: ParsedStatValue | null,
  active: boolean,
  durationMs = 900,
  locale = 'ar',
): string {
  const reducedMotion = useReducedMotion() ?? false
  const finalText = useMemo(
    () => (target ? buildStatText(target, target.number, locale) : ''),
    [target, locale],
  )
  const [animated, setAnimated] = useState(finalText)
  const shouldAnimate = Boolean(target && active && !reducedMotion)

  useEffect(() => {
    if (!shouldAnimate || !target) return

    const start = performance.now()
    let frameRef = 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      const eased = 1 - (1 - progress) ** 3
      const current = target.number * eased
      setAnimated(buildStatText(target, current, locale))
      if (progress < 1) {
        frameRef = requestAnimationFrame(tick)
      }
    }

    frameRef = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef)
  }, [shouldAnimate, target, durationMs, locale])

  return shouldAnimate ? animated : finalText
}
