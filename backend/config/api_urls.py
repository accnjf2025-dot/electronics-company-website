from django.urls import include, path

from core.views import HealthCheckView

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('', include('core.urls')),
    path('', include('catalog.urls')),
    path('', include('portfolio.urls')),
]
