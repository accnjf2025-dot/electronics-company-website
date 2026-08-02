import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLocale } from '@/utils'

interface DirectionalArrowProps {
  className?: string
}

export function DirectionalArrow({ className = 'size-4' }: DirectionalArrowProps) {
  const { locale } = useLocale()
  const Icon = locale === 'ar' ? ArrowLeft : ArrowRight
  return <Icon className={className} aria-hidden="true" />
}
