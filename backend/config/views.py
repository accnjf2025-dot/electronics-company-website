"""Production views for serving the React SPA build."""

import mimetypes
from pathlib import Path

from django.conf import settings
from django.http import FileResponse, Http404


def _safe_frontend_path(relative: str) -> Path | None:
    frontend_dist = settings.FRONTEND_DIST
    if not frontend_dist.is_dir():
        return None

    target = (frontend_dist / relative).resolve()
    try:
        target.relative_to(frontend_dist.resolve())
    except ValueError:
        return None

    if target.is_file():
        return target
    return None


def spa_view(request):
    """Serve static frontend assets or fall back to index.html for client routes."""
    relative = request.path_info.lstrip('/')
    if relative:
        file_path = _safe_frontend_path(relative)
        if file_path is not None:
            content_type, _ = mimetypes.guess_type(str(file_path))
            return FileResponse(
                file_path.open('rb'),
                content_type=content_type or 'application/octet-stream',
            )

    index_path = settings.FRONTEND_DIST / 'index.html'
    if not index_path.is_file():
        raise Http404('Frontend build not found')

    return FileResponse(index_path.open('rb'), content_type='text/html; charset=utf-8')
