from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path

from config.views import spa_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('config.api_urls')),
]

# Django serves uploaded media in this temporary demo deployment.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# React SPA fallback — must remain after admin, API, static, and media routes.
urlpatterns += [
    re_path(r'^(?!api/|admin/|static/|media/).*$', spa_view, name='spa'),
]
