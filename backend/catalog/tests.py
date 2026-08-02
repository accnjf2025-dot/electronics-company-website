from decimal import Decimal

from django.core.management import call_command
from django.test import TestCase
from rest_framework.test import APIClient

from catalog.models import Brand, Product, ProductCategory


class ProductApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        call_command('seed_initial_data')
        self.category = ProductCategory.objects.get(slug='surveillance-cameras')
        self.brand = Brand.objects.get(slug='hikvision')
        self.active_product = Product.objects.create(
            category=self.category,
            brand=self.brand,
            name_ar='كاميرا تجريبية',
            name_en='Sample Camera',
            slug='sample-camera',
            sku='SKU-001',
            short_description_ar='وصف قصير',
            short_description_en='Short description',
            price=Decimal('150000'),
            old_price=Decimal('180000'),
            availability=Product.Availability.IN_STOCK,
            featured=True,
            installment_available=True,
            warranty_available=True,
            installation_available=True,
            installation_area_en='Najaf Al-Ashraf',
            is_active=True,
        )
        Product.objects.create(
            category=self.category,
            brand=self.brand,
            name_ar='كاميرا غير نشطة',
            name_en='Inactive Camera',
            slug='inactive-camera',
            sku='SKU-002',
            short_description_ar='وصف',
            short_description_en='Description',
            price=Decimal('100000'),
            availability=Product.Availability.OUT_OF_STOCK,
            is_active=False,
        )

    def test_products_list_returns_only_active_products(self):
        response = self.client.get('/api/v1/products/')
        self.assertEqual(response.status_code, 200)
        slugs = [item['slug'] for item in response.json()['results']]
        self.assertIn('sample-camera', slugs)
        self.assertNotIn('inactive-camera', slugs)

    def test_product_detail_by_slug(self):
        response = self.client.get('/api/v1/products/sample-camera/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['sku'], 'SKU-001')

    def test_product_filter_by_category_and_featured(self):
        response = self.client.get(
            '/api/v1/products/',
            {'category': 'surveillance-cameras', 'featured': 'true'},
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['count'], 1)

    def test_product_search(self):
        response = self.client.get('/api/v1/products/', {'search': 'Sample'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['count'], 1)
