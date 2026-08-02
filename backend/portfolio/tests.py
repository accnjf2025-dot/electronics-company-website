from django.core.management import call_command
from django.test import TestCase
from rest_framework.test import APIClient

from portfolio.models import Project, ProjectCategory


class ProjectApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        call_command('seed_initial_data')
        self.category = ProjectCategory.objects.get(slug='surveillance')
        self.active_project = Project.objects.create(
            category=self.category,
            title_ar='مشروع تجريبي',
            title_en='Sample Project',
            slug='sample-project',
            location_ar='النجف الأشرف',
            location_en='Najaf Al-Ashraf',
            short_description_ar='وصف قصير',
            short_description_en='Short description',
            featured=True,
            status=Project.Status.COMPLETED,
            is_active=True,
        )
        Project.objects.create(
            category=self.category,
            title_ar='مشروع غير نشط',
            title_en='Inactive Project',
            slug='inactive-project',
            location_ar='النجف',
            location_en='Najaf',
            short_description_ar='وصف',
            short_description_en='Description',
            is_active=False,
        )

    def test_projects_list_returns_only_active_projects(self):
        response = self.client.get('/api/v1/projects/')
        self.assertEqual(response.status_code, 200)
        slugs = [item['slug'] for item in response.json()['results']]
        self.assertIn('sample-project', slugs)
        self.assertNotIn('inactive-project', slugs)

    def test_project_detail_by_slug(self):
        response = self.client.get('/api/v1/projects/sample-project/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['title_en'], 'Sample Project')

    def test_project_filter_by_category(self):
        response = self.client.get('/api/v1/projects/', {'category': 'surveillance'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['count'], 1)
