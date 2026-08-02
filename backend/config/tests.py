import os
from unittest.mock import patch

from django.test import Client, SimpleTestCase, override_settings

from config.env import (
    build_allowed_hosts,
    build_csrf_trusted_origins,
    env_bool,
    normalize_host,
    normalize_csrf_origin,
    resolve_debug,
)


class EnvironmentParsingTests(SimpleTestCase):
    def setUp(self):
        self.env_patch = patch.dict(os.environ, {}, clear=True)
        self.env_patch.start()

    def tearDown(self):
        self.env_patch.stop()

    def test_debug_false_string_is_false(self):
        os.environ['DEBUG'] = 'false'
        self.assertFalse(resolve_debug())

    def test_debug_true_string_is_true(self):
        os.environ['DEBUG'] = 'true'
        self.assertTrue(resolve_debug())

    def test_debug_zero_is_false(self):
        os.environ['DEBUG'] = '0'
        self.assertFalse(resolve_debug())

    def test_debug_one_is_true(self):
        os.environ['DEBUG'] = '1'
        self.assertTrue(resolve_debug())

    def test_railway_debug_defaults_false_without_explicit_debug(self):
        os.environ['RAILWAY_PUBLIC_DOMAIN'] = 'future-of-technology-production.up.railway.app'
        self.assertFalse(resolve_debug())

    def test_local_debug_defaults_true_without_explicit_debug(self):
        self.assertTrue(resolve_debug())

    def test_debug_env_overrides_django_debug_on_railway(self):
        os.environ['DEBUG'] = 'false'
        os.environ['DJANGO_DEBUG'] = 'true'
        os.environ['RAILWAY_PUBLIC_DOMAIN'] = 'future-of-technology-production.up.railway.app'
        self.assertFalse(resolve_debug())

    def test_allowed_hosts_from_production_domain(self):
        os.environ['ALLOWED_HOSTS'] = 'future-of-technology-production.up.railway.app'
        hosts = build_allowed_hosts(
            debug=False,
            on_railway=True,
            railway_public_domain='future-of-technology-production.up.railway.app',
        )
        self.assertIn('future-of-technology-production.up.railway.app', hosts)
        self.assertIn('healthcheck.railway.app', hosts)

    def test_allowed_hosts_normalizes_scheme_and_trailing_slash(self):
        os.environ['ALLOWED_HOSTS'] = 'https://future-of-technology-production.up.railway.app/'
        hosts = build_allowed_hosts(debug=False, on_railway=False, railway_public_domain='')
        self.assertEqual(
            hosts,
            [
                'future-of-technology-production.up.railway.app',
                'healthcheck.railway.app',
            ],
        )

    def test_allowed_hosts_ignores_blank_entries(self):
        os.environ['ALLOWED_HOSTS'] = ' , ,future-of-technology-production.up.railway.app, '
        hosts = build_allowed_hosts(debug=False, on_railway=False, railway_public_domain='')
        self.assertIn('future-of-technology-production.up.railway.app', hosts)
        self.assertNotIn('', hosts)

    def test_normalize_host_strips_scheme_path_and_slashes(self):
        self.assertEqual(
            normalize_host('https://future-of-technology-production.up.railway.app/admin/'),
            'future-of-technology-production.up.railway.app',
        )

    def test_csrf_trusted_origins_use_full_origin(self):
        os.environ['CSRF_TRUSTED_ORIGINS'] = (
            'https://future-of-technology-production.up.railway.app'
        )
        origins = build_csrf_trusted_origins(
            railway_public_domain='future-of-technology-production.up.railway.app',
        )
        self.assertIn('https://future-of-technology-production.up.railway.app', origins)
        self.assertTrue(all(origin.startswith('http') for origin in origins))

    def test_csrf_origin_from_bare_hostname_gets_https(self):
        self.assertEqual(
            normalize_csrf_origin('future-of-technology-production.up.railway.app'),
            'https://future-of-technology-production.up.railway.app',
        )

    def test_env_bool_does_not_use_python_bool_on_strings(self):
        os.environ['SECURE_SSL_REDIRECT'] = 'false'
        self.assertFalse(env_bool('SECURE_SSL_REDIRECT'))


class ProductionHealthEndpointTests(SimpleTestCase):
    @override_settings(
        DEBUG=False,
        ALLOWED_HOSTS=[
            'future-of-technology-production.up.railway.app',
            'healthcheck.railway.app',
        ],
        SECURE_SSL_REDIRECT=True,
        SECURE_REDIRECT_EXEMPT=[r'^api/v1/health/$'],
    )
    def test_health_endpoint_returns_200_for_public_domain(self):
        client = Client()
        response = client.get(
            '/api/v1/health/',
            HTTP_HOST='future-of-technology-production.up.railway.app',
            secure=False,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})
        self.assertNotIn(b'DisallowedHost', response.content)
        self.assertNotIn(b'Traceback', response.content)

    @override_settings(
        DEBUG=False,
        ALLOWED_HOSTS=[
            'future-of-technology-production.up.railway.app',
            'healthcheck.railway.app',
        ],
        SECURE_SSL_REDIRECT=True,
        SECURE_REDIRECT_EXEMPT=[r'^api/v1/health/$'],
    )
    def test_health_endpoint_returns_200_for_railway_healthcheck_host(self):
        client = Client()
        response = client.get(
            '/api/v1/health/',
            HTTP_HOST='healthcheck.railway.app',
            secure=False,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})
