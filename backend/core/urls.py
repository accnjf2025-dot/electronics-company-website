from django.urls import path
from rest_framework.routers import DefaultRouter

from .views_api import CompanyProfileView, CompanyValueViewSet, PartnerViewSet, ServiceViewSet

router = DefaultRouter()
router.register('values', CompanyValueViewSet, basename='company-value')
router.register('services', ServiceViewSet, basename='service')
router.register('partners', PartnerViewSet, basename='partner')

urlpatterns = [
    path('company/', CompanyProfileView.as_view(), name='company-profile'),
    *router.urls,
]
