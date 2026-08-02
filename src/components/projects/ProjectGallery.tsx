import { useEffect, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import type { Project } from '@/types'
import { pickLocalized, useTranslation } from '@/utils'
import { ImageWithFallback } from '@/components/common'

interface ProjectGalleryProps {
  project: Project
}

function isPlaceholderImage(src: string): boolean {
  return src.includes('placeholder')
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const { t, locale } = useTranslation()
  const title = pickLocalized(project, 'title', locale)
  const images = [...new Set([project.coverImage, ...project.gallery].filter(Boolean))]
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const hasMultiple = images.length > 1
  const activeImage = images[activeIndex] ?? '/images/placeholder.svg'
  const placeholder = isPlaceholderImage(activeImage)

  const imageCount = images.length

  const goTo = (index: number) => {
    const next = (index + imageCount) % imageCount
    setActiveIndex(next)
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') {
        setActiveIndex((i) => (i + (locale === 'ar' ? -1 : 1) + imageCount) % imageCount)
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((i) => (i + (locale === 'ar' ? 1 : -1) + imageCount) % imageCount)
      }
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxOpen, locale, imageCount])

  if (images.length <= 1) return null

  const PrevIcon = locale === 'ar' ? ChevronRight : ChevronLeft
  const NextIcon = locale === 'ar' ? ChevronLeft : ChevronRight

  return (
    <section aria-label={t.projectsCatalog.gallery}>
      <h2 className="mb-3 text-xl font-bold text-brand-navy">{t.projectsCatalog.gallery}</h2>

      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="group relative w-full overflow-hidden rounded-xl border border-surface-200 bg-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        aria-label={`${t.projectsCatalog.enlargeImage}: ${title}`}
      >
        <ImageWithFallback
          src={activeImage}
          alt={title}
          className={`aspect-video w-full ${placeholder ? 'object-contain p-6' : 'object-cover'}`}
        />
        <span className="absolute end-3 top-3 flex size-9 items-center justify-center rounded-full bg-brand-navy/70 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <ZoomIn className="size-4" aria-hidden="true" />
        </span>
      </button>

      {hasMultiple && (
        <div
          role="tablist"
          aria-label={title}
          className="mt-3 flex gap-2 overflow-x-auto pb-1 ps-1 [scroll-padding-inline:0.25rem] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`${title} ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveIndex(index)
              }}
              className={`shrink-0 overflow-hidden rounded-lg border-2 bg-brand-navy transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
                activeIndex === index
                  ? 'border-brand-yellow'
                  : 'border-surface-200 hover:border-brand-yellow/40'
              }`}
            >
              <ImageWithFallback
                src={image}
                alt=""
                className={`size-16 sm:size-20 ${isPlaceholderImage(image) ? 'object-contain p-1' : 'object-cover'}`}
              />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/90 p-4 pb-24 md:pb-4"
          role="dialog"
          aria-modal="true"
          aria-label={t.projectsCatalog.gallery}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute end-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            aria-label={t.projectsCatalog.closeLightbox}
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                className="absolute start-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                aria-label={t.projectsCatalog.previousImage}
              >
                <PrevIcon className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                className="absolute end-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                aria-label={t.projectsCatalog.nextImage}
              >
                <NextIcon className="size-5" aria-hidden="true" />
              </button>
            </>
          )}

          <ImageWithFallback
            src={activeImage}
            alt={title}
            className="max-h-[75vh] max-w-full object-contain"
          />
        </div>
      )}
    </section>
  )
}
