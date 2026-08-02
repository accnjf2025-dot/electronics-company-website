export interface TrustHighlight {
  id: string
  labelAr: string
  labelEn: string
  icon: 'users' | 'truck' | 'wrench' | 'credit-card'
}

export const trustHighlights: TrustHighlight[] = [
  {
    id: 'individuals-orgs',
    labelAr: 'حلول للأفراد والمؤسسات',
    labelEn: 'Solutions for Individuals and Organizations',
    icon: 'users',
  },
  {
    id: 'delivery',
    labelAr: 'توصيل إلى جميع المحافظات',
    labelEn: 'Delivery Across All Iraqi Provinces',
    icon: 'truck',
  },
  {
    id: 'installation',
    labelAr: 'تركيب داخل النجف الأشرف',
    labelEn: 'Installation Within Najaf',
    icon: 'wrench',
  },
  {
    id: 'payment',
    labelAr: 'بيع نقدًا وبالتقسيط',
    labelEn: 'Cash and Installment Purchasing',
    icon: 'credit-card',
  },
]
