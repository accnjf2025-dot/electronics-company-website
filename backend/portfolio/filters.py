import django_filters
from django.db import models

from .models import Project


class ProjectFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category__slug', lookup_expr='iexact')
    featured = django_filters.BooleanFilter()
    status = django_filters.ChoiceFilter(choices=Project.Status.choices)
    location = django_filters.CharFilter(method='filter_location')

    class Meta:
        model = Project
        fields = ['category', 'featured', 'status', 'location']

    def filter_location(self, queryset, name, value):
        return queryset.filter(
            models.Q(location_en__icontains=value) | models.Q(location_ar__icontains=value)
        )
