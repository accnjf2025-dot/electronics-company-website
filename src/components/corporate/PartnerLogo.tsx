import { useState } from 'react'
import type { Partner } from '@/types'

const PLACEHOLDER_PATTERN = /placeholder/i

function hasValidLogo(logo: string): boolean {
  return Boolean(logo) && !PLACEHOLDER_PATTERN.test(logo)
}

export type PartnerLogoVariant = 'homepage' | 'page'

interface PartnerLogoProps {
  partner: Partner
  variant?: PartnerLogoVariant
  className?: string
}

const variantStyles: Record<
  PartnerLogoVariant,
  { container: string; image: string; fallback: string }
> = {
  homepage: {
    container: 'h-[4.75rem] min-h-[4rem] sm:h-[5.25rem] lg:h-[5.375rem]',
    image: 'max-h-[3.25rem] sm:max-h-[4.25rem] lg:max-h-[5.375rem] max-w-full',
    fallback: 'text-sm sm:text-base',
  },
  page: {
    container: 'h-[6.5rem] min-h-[5rem] sm:h-[6.875rem]',
    image: 'max-h-[5rem] sm:max-h-[5.75rem] max-w-full',
    fallback: 'text-base sm:text-lg',
  },
}

export function PartnerLogo({ partner, variant = 'page', className = '' }: PartnerLogoProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const styles = variantStyles[variant]
  const showImage = hasValidLogo(partner.logo) && !imageFailed

  return (
    <div
      className={`flex w-full items-center justify-center rounded-lg border border-surface-100 bg-white px-4 py-3 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.8)] ${styles.container} ${className}`}
    >
      {showImage ? (
        <img
          src={partner.logo}
          alt={partner.name}
          className={`w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] ${styles.image}`}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span
          className={`line-clamp-2 max-w-full text-center font-semibold leading-snug text-brand-navy ${styles.fallback}`}
          aria-hidden="true"
        >
          {partner.name}
        </span>
      )}
    </div>
  )
}
