from django.core.management import call_command
from django.test import TestCase
from rest_framework.test import APIClient

from core.models import CompanyProfile, Service


class HealthEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_health_endpoint_returns_ok(self):
        response = self.client.get('/api/v1/health/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})


class CompanyProfileApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        call_command('seed_initial_data')

    def test_company_profile_endpoint_returns_active_profile(self):
        response = self.client.get('/api/v1/company/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['name_en'], 'Future of Technology')
        self.assertEqual(response.json()['phone'], '0780 901 1050')

    def test_values_endpoint_returns_active_values(self):
        response = self.client.get('/api/v1/values/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        results = data['results'] if isinstance(data, dict) else data
        self.assertEqual(len(results), 4)


class SeedCommandTests(TestCase):
    def test_seed_command_is_idempotent(self):
        call_command('seed_initial_data')
        first_count = Service.objects.count()
        call_command('seed_initial_data')
        self.assertEqual(Service.objects.count(), first_count)
        self.assertEqual(CompanyProfile.objects.count(), 1)


class ServiceApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        call_command('seed_initial_data')

    def test_services_list_returns_active_services(self):
        Service.objects.filter(slug='professional-audio-systems').update(is_active=False)
        response = self.client.get('/api/v1/services/')
        data = response.json()
        results = data['results'] if isinstance(data, dict) else data
        slugs = [item['slug'] for item in results]
        self.assertNotIn('professional-audio-systems', slugs)
