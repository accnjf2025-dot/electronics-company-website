import django_filters

from .models import Product


class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category__slug', lookup_expr='iexact')
    brand = django_filters.CharFilter(field_name='brand__slug', lookup_expr='iexact')
    availability = django_filters.ChoiceFilter(choices=Product.Availability.choices)
    featured = django_filters.BooleanFilter()
    installment = django_filters.BooleanFilter(field_name='installment_available')
    warranty = django_filters.BooleanFilter(field_name='warranty_available')
    installation = django_filters.BooleanFilter(field_name='installation_available')

    class Meta:
        model = Product
        fields = [
            'category',
            'brand',
            'availability',
            'featured',
            'installment',
            'warranty',
            'installation',
        ]
