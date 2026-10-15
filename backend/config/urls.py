from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve

from config.views import spa_view


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('config.api_urls')),

    # Serve uploaded media files from Railway volume
    re_path(
        r'^media/(?P<path>.*)$',
        serve,
        {'document_root': settings.MEDIA_ROOT},
    ),
]

# React SPA fallback — must remain last
urlpatterns += [
    re_path(
        r'^(?!api/|admin/|static/|media/).*$',
        spa_view,
        name='spa',
    ),
]
