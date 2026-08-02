import { useState } from 'react'
import { companyProfile } from '@/data/company'
import { useTranslation } from '@/utils'

const FALLBACK_SRC = '/images/placeholder.svg'

interface LogoProps {
  variant?: 'header' | 'footer'
  className?: string
}

const wrapperClass = {
  header: 'h-[42px] w-[150px] sm:h-[44px] sm:w-[165px] md:h-[50px] md:w-[185px]',
  footer: 'h-[58px] w-[230px] md:h-[68px] md:w-[270px]',
} as const

const imageScale = {
  header: 'scale-[1.42] sm:scale-[1.45] md:scale-[1.48]',
  footer: 'scale-[1.28] md:scale-[1.32]',
} as const

export function Logo({ variant = 'header', className = '' }: LogoProps) {
  const { locale } = useTranslation()
  const [hasError, setHasError] = useState(false)
  const src = hasError ? FALLBACK_SRC : companyProfile.logoPath
  const altText = locale === 'ar' ? companyProfile.logoAltAr : companyProfile.logoAltEn
  const isHeader = variant === 'header'

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden ${wrapperClass[variant]} ${className}`}
    >
      <img
        src={src}
        alt={isHeader ? '' : altText}
        aria-hidden={isHeader && !hasError ? true : undefined}
        className={`h-full w-full max-w-none object-contain object-center ${imageScale[variant]}`}
        onError={() => setHasError(true)}
      />
    </div>
  )
}
