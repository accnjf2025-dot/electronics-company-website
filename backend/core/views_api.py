from rest_framework import mixins, viewsets
from django.http import Http404
from rest_framework.generics import RetrieveAPIView

from .models import CompanyProfile, CompanyValue, Partner, Service
from .serializers import (
    CompanyProfileSerializer,
    CompanyValueSerializer,
    PartnerSerializer,
    ServiceDetailSerializer,
    ServiceListSerializer,
)


class ActiveQuerysetMixin:
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)


class CompanyProfileView(RetrieveAPIView):
    serializer_class = CompanyProfileSerializer
    authentication_classes: list = []
    permission_classes: list = []

    def get_object(self):
        profile = CompanyProfile.objects.filter(is_active=True).first()
        if profile is None:
            profile = CompanyProfile.objects.order_by('-updated_at').first()
        if profile is None:
            raise Http404('Company profile not found.')
        return profile


class CompanyValueViewSet(ActiveQuerysetMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = CompanyValue.objects.all()
    serializer_class = CompanyValueSerializer
    authentication_classes: list = []
    permission_classes: list = []


class ServiceViewSet(
    ActiveQuerysetMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Service.objects.all()
    lookup_field = 'slug'
    authentication_classes: list = []
    permission_classes: list = []

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ServiceDetailSerializer
        return ServiceListSerializer


class PartnerViewSet(ActiveQuerysetMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    authentication_classes: list = []
    permission_classes: list = []
