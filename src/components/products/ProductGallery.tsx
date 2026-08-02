import { useState } from 'react'
import type { Product } from '@/types'
import { pickLocalized, useTranslation } from '@/utils'
import { ImageWithFallback } from '@/components/common'

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const { locale } = useTranslation()
  const name = pickLocalized(product, 'name', locale)
  const images = product.images.length > 0 ? product.images : ['/images/placeholder.svg']
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex] ?? images[0] ?? '/images/placeholder.svg'
  const hasMultipleImages = images.length > 1

  return (
    <div className="min-w-0">
      <div
        className={`overflow-hidden rounded-xl border border-surface-200 bg-surface-50 ${
          hasMultipleImages ? '' : 'flex items-center justify-center'
        }`}
      >
        <ImageWithFallback
          src={activeImage}
          alt={name}
          className={
            hasMultipleImages
              ? 'aspect-[4/3] w-full object-contain p-4 sm:p-6'
              : 'max-h-[min(380px,45vh)] w-full object-contain p-4 sm:max-h-[420px] sm:p-6'
          }
        />
      </div>

      {hasMultipleImages && (
        <div
          role="tablist"
          aria-label={name}
          className="mt-3 flex gap-2 overflow-x-auto pb-1 ps-1 [scroll-padding-inline:0.25rem] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`${name} ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
                activeIndex === index
                  ? 'border-brand-yellow'
                  : 'border-surface-200 hover:border-brand-yellow/40'
              }`}
            >
              <ImageWithFallback
                src={image}
                alt=""
                className="size-16 object-contain p-1 sm:size-20"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
