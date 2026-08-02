import type { LucideIcon } from 'lucide-react'
import {
  Speaker,
  Camera,
  Shield,
  Sun,
  Lock,
  Home,
} from 'lucide-react'

export interface Service {
  id: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  includesAr: string[]
  includesEn: string[]
  icon: LucideIcon
}

export const services: Service[] = [
  {
    id: 'svc-audio',
    titleAr: 'تجهيز وتنصيب المنظومات الصوتية',
    titleEn: 'Supply and installation of professional audio systems',
    descriptionAr:
      'توريد وتركيب أنظمة صوتية للمنازل والقاعات والمؤسسات وفق احتياجات المكان.',
    descriptionEn:
      'Supply and installation of audio systems for homes, halls, and institutions based on site requirements.',
    includesAr: ['معاينة الموقع', 'اختيار المعدات', 'التركيب والتوصيل', 'الضبط والاختبار'],
    includesEn: ['Site assessment', 'Equipment selection', 'Installation and wiring', 'Tuning and testing'],
    icon: Speaker,
  },
  {
    id: 'svc-surveillance',
    titleAr: 'تجهيز وتنصيب منظومات كاميرات المراقبة',
    titleEn: 'Supply and installation of surveillance camera systems',
    descriptionAr:
      'تصميم وتجهيز وتركيب أنظمة مراقبة متكاملة للحماية والمتابعة عن بُعد.',
    descriptionEn:
      'Design, supply, and installation of integrated surveillance systems for security and remote monitoring.',
    includesAr: ['تصميم مواقع الكاميرات', 'التوريد والتركيب', 'إعداد التسجيل', 'المراقبة عن بُعد'],
    includesEn: ['Camera layout design', 'Supply and installation', 'Recording setup', 'Remote monitoring'],
    icon: Camera,
  },
  {
    id: 'svc-control',
    titleAr: 'تجهيز وتنصيب منظومات السيطرة والحوكمة',
    titleEn: 'Supply and installation of control and governance systems',
    descriptionAr:
      'حلول سيطرة وإدارة للمنشآت والمؤسسات لتحسين التشغيل والرقابة.',
    descriptionEn:
      'Control and management solutions for facilities and organizations to improve operations and oversight.',
    includesAr: ['تحليل الاحتياج', 'تصميم المنظومة', 'التركيب والربط', 'التشغيل والتسليم'],
    includesEn: ['Needs analysis', 'System design', 'Installation and integration', 'Commissioning and handover'],
    icon: Shield,
  },
  {
    id: 'svc-solar',
    titleAr: 'تجهيز وتنصيب منظومات الطاقة الشمسية',
    titleEn: 'Supply and installation of solar energy systems',
    descriptionAr:
      'تجهيز وتركيب حلول طاقة شمسية للمنازل والمنشآت بما يناسب الاستهلاك والمساحة.',
    descriptionEn:
      'Supply and installation of solar energy solutions for homes and facilities based on usage and space.',
    includesAr: ['دراسة أولية', 'اختيار المنظومة', 'التركيب والتوصيل', 'الاختبار والتسليم'],
    includesEn: ['Initial assessment', 'System selection', 'Installation and wiring', 'Testing and handover'],
    icon: Sun,
  },
  {
    id: 'svc-hotel-locks',
    titleAr: 'تجهيز وتنصيب منظومات الأقفال الذكية للفنادق',
    titleEn: 'Supply and installation of smart hotel lock systems',
    descriptionAr:
      'أنظمة أقفال ذكية للفنادق والشقق الفندقية مع إدارة دخول آمنة ومرنة.',
    descriptionEn:
      'Smart lock systems for hotels and serviced apartments with secure, flexible access management.',
    includesAr: ['تقييم الغرف', 'توريد الأقفال', 'التركيب والبرمجة', 'تدريب الفريق'],
    includesEn: ['Room assessment', 'Lock supply', 'Installation and programming', 'Staff training'],
    icon: Lock,
  },
  {
    id: 'svc-smart-home',
    titleAr: 'تجهيز وتنصيب منظومات المنزل الذكي',
    titleEn: 'Supply and installation of smart home systems',
    descriptionAr:
      'حلول منزل ذكي للتحكم بالإضاءة والأمن والأجهزة من مكان واحد.',
    descriptionEn:
      'Smart home solutions to control lighting, security, and devices from one place.',
    includesAr: ['تخطيط المنظومة', 'توريد الأجهزة', 'التركيب والتكامل', 'الإعداد والتسليم'],
    includesEn: ['System planning', 'Device supply', 'Installation and integration', 'Setup and handover'],
    icon: Home,
  },
]
