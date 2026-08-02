"""
Django settings for Future of Technology backend.
"""

import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / '.env')


def _env_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name, '').strip().lower()
    if not value:
        return default
    return value in ('true', '1', 'yes', 'on')


def _env_list(name: str, default: str = '') -> list[str]:
    raw = os.getenv(name, default)
    return [item.strip() for item in raw.split(',') if item.strip()]


def _resolve_data_dir() -> Path:
    for key in ('RAILWAY_VOLUME_MOUNT_PATH', 'DATA_DIR'):
        value = os.getenv(key, '').strip()
        if value:
            return Path(value)
    return BASE_DIR


SECRET_KEY = os.getenv('SECRET_KEY') or os.getenv(
    'DJANGO_SECRET_KEY',
    'django-insecure-change-me-in-production',
)

if 'DJANGO_DEBUG' in os.environ:
    DEBUG = _env_bool('DJANGO_DEBUG', True)
else:
    DEBUG = _env_bool('DEBUG', True)

RAILWAY_PUBLIC_DOMAIN = os.getenv('RAILWAY_PUBLIC_DOMAIN', '').strip()
RAILWAY_HEALTHCHECK_HOST = 'healthcheck.railway.app'
ON_RAILWAY = bool(
    os.getenv('RAILWAY_PUBLIC_DOMAIN')
    or os.getenv('RAILWAY_ENVIRONMENT')
    or os.getenv('RAILWAY_SERVICE_ID')
    or os.getenv('RAILWAY_VOLUME_MOUNT_PATH')
)

_default_hosts = 'localhost,127.0.0.1' if DEBUG else ''
_allowed_hosts = _env_list('ALLOWED_HOSTS') or _env_list('DJANGO_ALLOWED_HOSTS', _default_hosts)
if RAILWAY_PUBLIC_DOMAIN and RAILWAY_PUBLIC_DOMAIN not in _allowed_hosts:
    _allowed_hosts.append(RAILWAY_PUBLIC_DOMAIN)
if (not DEBUG or ON_RAILWAY) and RAILWAY_HEALTHCHECK_HOST not in _allowed_hosts:
    _allowed_hosts.append(RAILWAY_HEALTHCHECK_HOST)
ALLOWED_HOSTS = list(dict.fromkeys(_allowed_hosts))

_csrf_origins = _env_list('CSRF_TRUSTED_ORIGINS')
if RAILWAY_PUBLIC_DOMAIN:
    _csrf_origins.append(f'https://{RAILWAY_PUBLIC_DOMAIN}')
CSRF_TRUSTED_ORIGINS = list(dict.fromkeys(_csrf_origins))

DATA_DIR = _resolve_data_dir()
FRONTEND_DIST = Path(os.getenv('FRONTEND_DIST', str(BASE_DIR.parent / 'frontend_dist')))

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'django_filters',
    'corsheaders',
    'core',
    'catalog',
    'portfolio',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'
ASGI_APPLICATION = 'config.asgi.application'

DATABASE_ENGINE = os.getenv('DATABASE_ENGINE', 'sqlite').lower()

if DATABASE_ENGINE == 'postgresql':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('POSTGRES_DB', 'future_of_technology'),
            'USER': os.getenv('POSTGRES_USER', 'postgres'),
            'PASSWORD': os.getenv('POSTGRES_PASSWORD', ''),
            'HOST': os.getenv('POSTGRES_HOST', 'localhost'),
            'PORT': os.getenv('POSTGRES_PORT', '5432'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': DATA_DIR / os.getenv('DATABASE_NAME', 'db.sqlite3'),
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Baghdad'
USE_I18N = True
USE_TZ = True

LANGUAGES = [
    ('en', 'English'),
    ('ar', 'Arabic'),
]

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STORAGES = {
    'default': {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
    },
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
    },
}

MEDIA_URL = '/media/'
MEDIA_ROOT = DATA_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

_default_cors = 'http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174'
CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv('CORS_ALLOWED_ORIGINS', _default_cors if DEBUG else '').split(',')
    if origin.strip()
]

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
}

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'
    SECURE_REFERRER_POLICY = 'same-origin'
    SECURE_SSL_REDIRECT = _env_bool('SECURE_SSL_REDIRECT', False)
    if SECURE_SSL_REDIRECT:
        SECURE_REDIRECT_EXEMPT = [r'^api/v1/health/$']
