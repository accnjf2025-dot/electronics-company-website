from django.core.management.base import BaseCommand
from django.db import transaction

from catalog.models import Brand, ProductCategory
from core.models import CompanyProfile, CompanyValue, Partner, Service, ServiceFeature
from portfolio.models import ProjectCategory


COMPANY_PROFILE = {
    'name_ar': 'مستقبل التقنية',
    'name_en': 'Future of Technology',
    'short_description_ar': (
        'مستقبل التقنية شركة متخصصة في تجهيز وتنصيب الحلول والمنتجات التقنية المتكاملة '
        'للأفراد والمؤسسات. نوفر أنظمة مراقبة وصوت واتصالات وطاقة وحلولًا ذكية، '
        'مع التوصيل إلى مختلف أنحاء العراق وخدمات التركيب داخل النجف الأشرف.'
    ),
    'short_description_en': (
        'Future of Technology specializes in supplying and installing integrated technology '
        'products and solutions for individuals and organizations. Our services include '
        'surveillance, audio, communications, energy, and smart systems, with delivery '
        'across Iraq and installation services within Najaf.'
    ),
    'story_ar': (
        'في مستقبل التقنية، نؤمن بأن التكنولوجيا الفعّالة تبدأ من فهم احتياجات العميل '
        'وتقديم الحل المناسب لها. لذلك نعمل على توفير حلول حديثة ومتكاملة في مجالات '
        'تكنولوجيا المعلومات، وأنظمة المراقبة، والمنظومات الصوتية، والاتصالات، '
        'والطاقة المتجددة، وحلول المنازل والمنشآت الذكية.\n\n'
        'نجمع بين المنتجات الموثوقة والخبرة في التجهيز والتنصيب لنقدّم خدمات تناسب '
        'الأفراد والشركات والمؤسسات. ونسعى باستمرار إلى مواكبة التطورات التقنية '
        'وتقديم حلول عملية تجمع بين الجودة، وسهولة الاستخدام، والدعم المستمر، '
        'بما يساهم في بناء بيئات أكثر أمانًا وكفاءة وذكاءً.'
    ),
    'story_en': (
        "At Future of Technology, we believe that effective technology begins with "
        "understanding each client's needs and delivering the right solution. We provide "
        'modern, integrated solutions across information technology, surveillance systems, '
        'professional audio, communications, renewable energy, and smart home and facility '
        'technologies.\n\n'
        'By combining reliable products with professional supply and installation expertise, '
        'we serve individuals, businesses, and institutions across Iraq. We continuously '
        'follow the latest technological developments to deliver practical solutions built '
        'around quality, ease of use, and ongoing support—helping our clients create safer, '
        'more efficient, and smarter environments.'
    ),
    'vision_ar': (
        'أن نكون من الجهات الموثوقة في العراق لتوفير الحلول التقنية الحديثة والمتكاملة، '
        'وأن نساهم في جعل التكنولوجيا أكثر سهولة وفائدة للأفراد والمؤسسات.'
    ),
    'vision_en': (
        'To become a trusted provider of modern, integrated technology solutions in Iraq '
        'and help make technology more accessible and valuable for individuals and organizations.'
    ),
    'mission_ar': (
        'تقديم منتجات موثوقة وحلول تقنية عملية تلائم احتياجات عملائنا، من خلال التجهيز المهني، '
        'والتنصيب المتخصص، وخدمات ما بعد البيع، مع الالتزام بالجودة والتطوير المستمر.'
    ),
    'mission_en': (
        "To deliver reliable products and practical technology solutions tailored to our "
        "clients' needs through professional supply, specialized installation, after-sales "
        'service, and a commitment to quality and continuous improvement.'
    ),
    'phone': '0780 901 1050',
    'whatsapp': '+9647809011050',
    'address_ar': 'النجف الأشرف – شارع غدير كرامة',
    'address_en': 'Najaf Al-Ashraf – Ghadeer Karama Street',
    'opening_hours_ar': 'مفتوح دائمًا',
    'opening_hours_en': 'Open 24 hours',
    'service_coverage_ar': 'نخدم الأفراد والشركات والمؤسسات في جميع أنحاء العراق',
    'service_coverage_en': 'Serving individuals, businesses, and institutions across Iraq',
    'installation_area_ar': 'خدمات التركيب متاحة داخل النجف الأشرف',
    'installation_area_en': 'Installation services are available within Najaf Al-Ashraf',
    'facebook_url': (
        'https://www.facebook.com/p/%D9%85%D8%B3%D8%AA%D9%82%D8%A8%D9%84-%D8%A7%D9%84%D8%AA%D9%82%D9%86%D9%8A%D8%A9-61565914113178/'
    ),
    'instagram_url': 'https://www.instagram.com/futur_etecno',
    'google_maps_url': 'https://maps.app.goo.gl/Dj7HL3pwzNdco8WF7',
    'gini_url': 'https://app.gini.iq/deeplink/mustaqbal_al-taqnia',
    'is_active': True,
}

COMPANY_VALUES = [
    {
        'slug_key': 'quality-reliability',
        'title_ar': 'الجودة والموثوقية',
        'title_en': 'Quality and Reliability',
        'description_ar': 'نلتزم بتقديم منتجات وحلول تستحق ثقة عملائنا',
        'description_en': 'We deliver products and solutions our clients can trust',
        'icon': 'award',
        'display_order': 1,
    },
    {
        'slug_key': 'integrated-solutions',
        'title_ar': 'الحلول المتكاملة',
        'title_en': 'Integrated Solutions',
        'description_ar': 'نوفر حلولاً شاملة من التوريد إلى التنصيب والدعم',
        'description_en': 'Complete solutions from supply to installation and support',
        'icon': 'layers',
        'display_order': 2,
    },
    {
        'slug_key': 'customer-commitment',
        'title_ar': 'الالتزام بالعميل',
        'title_en': 'Customer Commitment',
        'description_ar': 'نضع احتياجات العميل في صميم كل قرار نتخذه',
        'description_en': 'Client needs are at the center of every decision we make',
        'icon': 'handshake',
        'display_order': 3,
    },
    {
        'slug_key': 'continuous-innovation',
        'title_ar': 'التطوير المستمر',
        'title_en': 'Continuous Innovation',
        'description_ar': 'نواكب التطورات التقنية ونطور خدماتنا باستمرار',
        'description_en': 'We follow technology trends and improve our services continuously',
        'icon': 'lightbulb',
        'display_order': 4,
    },
]

SERVICES = [
    {
        'slug': 'professional-audio-systems',
        'name_ar': 'تجهيز وتنصيب المنظومات الصوتية',
        'name_en': 'Professional audio systems',
        'short_description_ar': 'توريد وتركيب أنظمة صوتية للمنازل والقاعات والمؤسسات وفق احتياجات المكان.',
        'short_description_en': 'Supply and installation of audio systems for homes, halls, and institutions.',
        'icon': 'speaker',
        'display_order': 1,
        'features_ar': ['معاينة الموقع', 'اختيار المعدات', 'التركيب والتوصيل', 'الضبط والاختبار'],
        'features_en': ['Site assessment', 'Equipment selection', 'Installation and wiring', 'Tuning and testing'],
    },
    {
        'slug': 'surveillance-camera-systems',
        'name_ar': 'تجهيز وتنصيب منظومات كاميرات المراقبة',
        'name_en': 'Surveillance camera systems',
        'short_description_ar': 'تصميم وتجهيز وتركيب أنظمة مراقبة متكاملة للحماية والمتابعة عن بُعد.',
        'short_description_en': 'Design, supply, and installation of integrated surveillance systems.',
        'icon': 'camera',
        'display_order': 2,
        'features_ar': ['تصميم مواقع الكاميرات', 'التوريد والتركيب', 'إعداد التسجيل', 'المراقبة عن بُعد'],
        'features_en': ['Camera layout design', 'Supply and installation', 'Recording setup', 'Remote monitoring'],
    },
    {
        'slug': 'control-governance-systems',
        'name_ar': 'تجهيز وتنصيب منظومات السيطرة والحوكمة',
        'name_en': 'Control and governance systems',
        'short_description_ar': 'حلول سيطرة وإدارة للمنشآت والمؤسسات لتحسين التشغيل والرقابة.',
        'short_description_en': 'Control and management solutions for facilities and organizations.',
        'icon': 'shield',
        'display_order': 3,
        'features_ar': ['تحليل الاحتياج', 'تصميم المنظومة', 'التركيب والربط', 'التشغيل والتسليم'],
        'features_en': ['Needs analysis', 'System design', 'Installation and integration', 'Commissioning'],
    },
    {
        'slug': 'solar-energy-systems',
        'name_ar': 'تجهيز وتنصيب منظومات الطاقة الشمسية',
        'name_en': 'Solar energy systems',
        'short_description_ar': 'تجهيز وتركيب حلول طاقة شمسية للمنازل والمنشآت.',
        'short_description_en': 'Supply and installation of solar energy solutions for homes and facilities.',
        'icon': 'sun',
        'display_order': 4,
        'features_ar': ['دراسة أولية', 'اختيار المنظومة', 'التركيب والتوصيل', 'الاختبار والتسليم'],
        'features_en': ['Initial assessment', 'System selection', 'Installation and wiring', 'Testing and handover'],
    },
    {
        'slug': 'smart-hotel-lock-systems',
        'name_ar': 'تجهيز وتنصيب منظومات الأقفال الذكية للفنادق',
        'name_en': 'Smart hotel lock systems',
        'short_description_ar': 'أنظمة أقفال ذكية للفنادق والشقق الفندقية مع إدارة دخول آمنة.',
        'short_description_en': 'Smart lock systems for hotels and serviced apartments.',
        'icon': 'lock',
        'display_order': 5,
        'features_ar': ['تقييم الغرف', 'توريد الأقفال', 'التركيب والبرمجة', 'تدريب الفريق'],
        'features_en': ['Room assessment', 'Lock supply', 'Installation and programming', 'Staff training'],
    },
    {
        'slug': 'smart-home-systems',
        'name_ar': 'تجهيز وتنصيب منظومات المنزل الذكي',
        'name_en': 'Smart home systems',
        'short_description_ar': 'حلول منزل ذكي للتحكم بالإضاءة والأمن والأجهزة من مكان واحد.',
        'short_description_en': 'Smart home solutions to control lighting, security, and devices.',
        'icon': 'home',
        'display_order': 6,
        'features_ar': ['تخطيط المنظومة', 'توريد الأجهزة', 'التركيب والتكامل', 'الإعداد والتسليم'],
        'features_en': ['System planning', 'Device supply', 'Installation and integration', 'Setup and handover'],
    },
]

PARTNERS = [
    {
        'slug': 'aswar',
        'name': 'ASWAR',
        'website_url': '',
        'description_ar': 'شريك في حلول الأمن والمراقبة',
        'description_en': 'Partner in security and surveillance solutions',
        'display_order': 1,
    },
    {
        'slug': 'hikvision',
        'name': 'Hikvision',
        'website_url': 'https://www.hikvision.com',
        'description_ar': 'أنظمة مراقبة وكاميرات أمنية',
        'description_en': 'Surveillance and security camera systems',
        'display_order': 2,
    },
    {
        'slug': 'dahua',
        'name': 'Dahua',
        'website_url': 'https://www.dahuasecurity.com',
        'description_ar': 'حلول مراقبة وتقنيات أمنية',
        'description_en': 'Surveillance and security technology solutions',
        'display_order': 3,
    },
    {
        'slug': 'samsung',
        'name': 'Samsung',
        'website_url': 'https://www.samsung.com',
        'description_ar': 'أجهزة وشاشات وتقنيات متعددة',
        'description_en': 'Devices, displays, and diverse technologies',
        'display_order': 4,
    },
    {
        'slug': 'lenovo',
        'name': 'Lenovo',
        'website_url': 'https://www.lenovo.com',
        'description_ar': 'أجهزة كمبيوتر وحلول تقنية',
        'description_en': 'Computers and technology solutions',
        'display_order': 5,
    },
    {
        'slug': 'hytera',
        'name': 'Hytera',
        'website_url': 'https://www.hytera.com',
        'description_ar': 'أجهزة اتصال لاسلكي احترافية',
        'description_en': 'Professional two-way radio communications',
        'display_order': 6,
    },
    {
        'slug': 'motorola',
        'name': 'Motorola',
        'website_url': 'https://www.motorola.com',
        'description_ar': 'اتصالات لاسلكية وأجهزة موثوقة',
        'description_en': 'Wireless communications and reliable devices',
        'display_order': 7,
    },
    {
        'slug': 'tp-link',
        'name': 'TP-Link',
        'website_url': 'https://www.tp-link.com',
        'description_ar': 'حلول شبكات وإنترنت',
        'description_en': 'Networking and internet solutions',
        'display_order': 8,
    },
]

PRODUCT_CATEGORIES = [
    {
        'slug': 'surveillance-cameras',
        'name_ar': 'كاميرات المراقبة',
        'name_en': 'Surveillance Cameras',
        'description_ar': 'أنظمة مراقبة متقدمة للمنازل والشركات والمؤسسات',
        'description_en': 'Advanced surveillance systems for homes, businesses, and institutions',
        'icon': 'camera',
        'display_order': 1,
    },
    {
        'slug': 'audio-speakers',
        'name_ar': 'الأجهزة الصوتية والسماعات',
        'name_en': 'Audio Equipment and Speakers',
        'description_ar': 'حلول صوتية احترافية للمنازل والقاعات والمؤسسات',
        'description_en': 'Professional audio solutions for homes, halls, and institutions',
        'icon': 'speaker',
        'display_order': 2,
    },
    {
        'slug': 'radios-microphones',
        'name_ar': 'أجهزة النداء اللاسلكي واللاقطات',
        'name_en': 'Two-Way Radios and Microphones',
        'description_ar': 'أجهزة اتصال لاسلكي ولاقطات للفرق والمشاريع الميدانية',
        'description_en': 'Two-way radios and microphones for teams and field operations',
        'icon': 'radio',
        'display_order': 3,
    },
    {
        'slug': 'broadcasting-internet',
        'name_ar': 'أجهزة البث والإنترنت',
        'name_en': 'Broadcasting and Internet Devices',
        'description_ar': 'معدات بث وشبكات وإنترنت للمنازل والمؤسسات',
        'description_en': 'Broadcasting, networking, and internet equipment',
        'icon': 'wifi',
        'display_order': 4,
    },
    {
        'slug': 'computers-phones',
        'name_ar': 'أجهزة الكمبيوتر والهواتف',
        'name_en': 'Computers and Mobile Phones',
        'description_ar': 'أجهزة حاسوب وهواتف ذكية للاستخدام الشخصي والمهني',
        'description_en': 'Computers and smartphones for personal and professional use',
        'icon': 'monitor',
        'display_order': 5,
    },
    {
        'slug': 'accessories-tools',
        'name_ar': 'الإكسسوارات والعِدد',
        'name_en': 'Accessories and Tools',
        'description_ar': 'ملحقات وعدد وأدوات داعمة لأنظمتك التقنية',
        'description_en': 'Accessories, tools, and supporting equipment',
        'icon': 'wrench',
        'display_order': 6,
    },
    {
        'slug': 'power-ups',
        'name_ar': 'أجهزة الطاقة وUPS',
        'name_en': 'Power Devices and UPS Systems',
        'description_ar': 'حلول طاقة وUPS لحماية الأجهزة واستمرارية العمل',
        'description_en': 'Power and UPS solutions to protect devices and ensure continuity',
        'icon': 'battery',
        'display_order': 7,
    },
]

BRANDS = [
    {'slug': 'aswar', 'name': 'ASWAR', 'website_url': '', 'display_order': 1},
    {'slug': 'hikvision', 'name': 'Hikvision', 'website_url': 'https://www.hikvision.com', 'display_order': 2},
    {'slug': 'dahua', 'name': 'Dahua', 'website_url': 'https://www.dahuasecurity.com', 'display_order': 3},
    {'slug': 'samsung', 'name': 'Samsung', 'website_url': 'https://www.samsung.com', 'display_order': 4},
    {'slug': 'lenovo', 'name': 'Lenovo', 'website_url': 'https://www.lenovo.com', 'display_order': 5},
    {'slug': 'hytera', 'name': 'Hytera', 'website_url': 'https://www.hytera.com', 'display_order': 6},
    {'slug': 'motorola', 'name': 'Motorola', 'website_url': 'https://www.motorola.com', 'display_order': 7},
    {'slug': 'tp-link', 'name': 'TP-Link', 'website_url': 'https://www.tp-link.com', 'display_order': 8},
]

PROJECT_CATEGORIES = [
    {
        'slug': 'surveillance',
        'name_ar': 'منظومات كاميرات المراقبة',
        'name_en': 'Surveillance Systems',
        'display_order': 1,
    },
    {
        'slug': 'audio',
        'name_ar': 'المنظومات الصوتية',
        'name_en': 'Audio Systems',
        'display_order': 2,
    },
    {
        'slug': 'control-governance',
        'name_ar': 'منظومات السيطرة والحوكمة',
        'name_en': 'Control and Governance Systems',
        'display_order': 3,
    },
    {
        'slug': 'solar-energy',
        'name_ar': 'منظومات الطاقة الشمسية',
        'name_en': 'Solar Energy Systems',
        'display_order': 4,
    },
    {
        'slug': 'smart-hotel-locks',
        'name_ar': 'الأقفال الذكية للفنادق',
        'name_en': 'Smart Hotel Locks',
        'display_order': 5,
    },
    {
        'slug': 'smart-home',
        'name_ar': 'منظومات المنزل الذكي',
        'name_en': 'Smart Home Systems',
        'display_order': 6,
    },
    {
        'slug': 'networking',
        'name_ar': 'الشبكات والاتصالات',
        'name_en': 'Networking and Communications',
        'display_order': 7,
    },
]


class Command(BaseCommand):
    help = 'Seed initial Future of Technology data (idempotent).'

    @transaction.atomic
    def handle(self, *args, **options):
        self._seed_company_profile()
        self._seed_company_values()
        self._seed_services()
        self._seed_partners()
        self._seed_product_categories()
        self._seed_brands()
        self._seed_project_categories()
        self.stdout.write(self.style.SUCCESS('Initial data seeded successfully.'))

    def _seed_company_profile(self) -> None:
        profile = CompanyProfile.objects.order_by('-updated_at').first()
        if profile is None:
            CompanyProfile.objects.create(**COMPANY_PROFILE)
            self.stdout.write('Created company profile.')
            return
        for field, value in COMPANY_PROFILE.items():
            setattr(profile, field, value)
        profile.save()
        self.stdout.write('Updated company profile.')

    def _seed_company_values(self) -> None:
        for item in COMPANY_VALUES:
            CompanyValue.objects.update_or_create(
                title_en=item['title_en'],
                defaults={
                    'title_ar': item['title_ar'],
                    'description_ar': item['description_ar'],
                    'description_en': item['description_en'],
                    'icon': item['icon'],
                    'display_order': item['display_order'],
                    'is_active': True,
                },
            )
        self.stdout.write(f'Seeded {len(COMPANY_VALUES)} company values.')

    def _seed_services(self) -> None:
        for item in SERVICES:
            service, _ = Service.objects.update_or_create(
                slug=item['slug'],
                defaults={
                    'name_ar': item['name_ar'],
                    'name_en': item['name_en'],
                    'short_description_ar': item['short_description_ar'],
                    'short_description_en': item['short_description_en'],
                    'full_description_ar': item['short_description_ar'],
                    'full_description_en': item['short_description_en'],
                    'icon': item['icon'],
                    'display_order': item['display_order'],
                    'is_featured': True,
                    'is_active': True,
                },
            )
            service.features.all().delete()
            for index, (text_ar, text_en) in enumerate(
                zip(item['features_ar'], item['features_en'], strict=True),
                start=1,
            ):
                ServiceFeature.objects.create(
                    service=service,
                    text_ar=text_ar,
                    text_en=text_en,
                    display_order=index,
                )
        self.stdout.write(f'Seeded {len(SERVICES)} services.')

    def _seed_partners(self) -> None:
        for item in PARTNERS:
            Partner.objects.update_or_create(
                slug=item['slug'],
                defaults={
                    'name': item['name'],
                    'website_url': item['website_url'],
                    'description_ar': item['description_ar'],
                    'description_en': item['description_en'],
                    'display_order': item['display_order'],
                    'is_featured': True,
                    'is_active': True,
                },
            )
        self.stdout.write(f'Seeded {len(PARTNERS)} partners.')

    def _seed_product_categories(self) -> None:
        for item in PRODUCT_CATEGORIES:
            ProductCategory.objects.update_or_create(
                slug=item['slug'],
                defaults={
                    'name_ar': item['name_ar'],
                    'name_en': item['name_en'],
                    'description_ar': item['description_ar'],
                    'description_en': item['description_en'],
                    'icon': item['icon'],
                    'display_order': item['display_order'],
                    'is_active': True,
                },
            )
        self.stdout.write(f'Seeded {len(PRODUCT_CATEGORIES)} product categories.')

    def _seed_brands(self) -> None:
        for item in BRANDS:
            Brand.objects.update_or_create(
                slug=item['slug'],
                defaults={
                    'name': item['name'],
                    'website_url': item['website_url'],
                    'display_order': item['display_order'],
                    'is_active': True,
                },
            )
        self.stdout.write(f'Seeded {len(BRANDS)} brands.')

    def _seed_project_categories(self) -> None:
        for item in PROJECT_CATEGORIES:
            ProjectCategory.objects.update_or_create(
                slug=item['slug'],
                defaults={
                    'name_ar': item['name_ar'],
                    'name_en': item['name_en'],
                    'display_order': item['display_order'],
                    'is_active': True,
                },
            )
        self.stdout.write(f'Seeded {len(PROJECT_CATEGORIES)} project categories.')
