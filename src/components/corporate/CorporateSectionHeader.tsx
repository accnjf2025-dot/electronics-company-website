interface CorporateSectionHeaderProps {
  title: string
  description?: string
  align?: 'start' | 'center'
}

export function CorporateSectionHeader({
  title,
  description,
  align = 'start',
}: CorporateSectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <h2 className="text-xl font-bold text-brand-navy md:text-2xl">{title}</h2>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-text-secondary md:text-base">{description}</p>
      )}
    </div>
  )
}
