"""Environment parsing helpers for Django settings."""

from __future__ import annotations

import os
from urllib.parse import urlparse

RAILWAY_HEALTHCHECK_HOST = 'healthcheck.railway.app'


def env_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {'1', 'true', 'yes', 'on'}


def normalize_host(value: str) -> str:
    cleaned = value.strip()
    if not cleaned:
        return ''

    if '://' in cleaned:
        cleaned = cleaned.split('://', 1)[1]

    cleaned = cleaned.split('/', 1)[0].strip()
    return cleaned.rstrip('.')


def env_host_list(*names: str, default: str = '') -> list[str]:
    hosts: list[str] = []

    for name in names:
        raw = os.getenv(name)
        if raw is None:
            continue
        for item in raw.split(','):
            host = normalize_host(item)
            if host:
                hosts.append(host)

    if not hosts and default:
        for item in default.split(','):
            host = normalize_host(item)
            if host:
                hosts.append(host)

    return list(dict.fromkeys(hosts))


def normalize_csrf_origin(value: str) -> str:
    cleaned = value.strip()
    if not cleaned:
        return ''

    if '://' in cleaned:
        parsed = urlparse(cleaned)
        if not parsed.scheme or not parsed.netloc:
            return ''
        return f'{parsed.scheme}://{parsed.netloc}'

    host = normalize_host(cleaned)
    if not host:
        return ''
    return f'https://{host}'


def env_origin_list(*names: str) -> list[str]:
    origins: list[str] = []

    for name in names:
        raw = os.getenv(name)
        if raw is None:
            continue
        for item in raw.split(','):
            origin = normalize_csrf_origin(item)
            if origin:
                origins.append(origin)

    return list(dict.fromkeys(origins))


def is_railway_environment() -> bool:
    return bool(
        os.getenv('RAILWAY_ENVIRONMENT')
        or os.getenv('RAILWAY_ENVIRONMENT_NAME')
        or os.getenv('RAILWAY_SERVICE_ID')
        or os.getenv('RAILWAY_PUBLIC_DOMAIN')
        or os.getenv('RAILWAY_PRIVATE_DOMAIN')
    )


def resolve_debug() -> bool:
    if is_railway_environment():
        default = False
    else:
        default = True

    if os.getenv('DEBUG') is not None:
        return env_bool('DEBUG', False)
    if os.getenv('DJANGO_DEBUG') is not None:
        return env_bool('DJANGO_DEBUG', False)
    return default


def build_allowed_hosts(*, debug: bool, on_railway: bool, railway_public_domain: str) -> list[str]:
    hosts = env_host_list('ALLOWED_HOSTS', 'DJANGO_ALLOWED_HOSTS')

    if not hosts and debug:
        hosts = ['localhost', '127.0.0.1']

    railway_host = normalize_host(railway_public_domain)
    if railway_host:
        hosts.append(railway_host)

    if not debug or on_railway:
        hosts.append(RAILWAY_HEALTHCHECK_HOST)

    return list(dict.fromkeys(normalize_host(host) for host in hosts if normalize_host(host)))


def build_csrf_trusted_origins(*, railway_public_domain: str) -> list[str]:
    origins = env_origin_list('CSRF_TRUSTED_ORIGINS')

    railway_origin = normalize_csrf_origin(railway_public_domain)
    if railway_origin:
        origins.append(railway_origin)

    return list(dict.fromkeys(origins))
