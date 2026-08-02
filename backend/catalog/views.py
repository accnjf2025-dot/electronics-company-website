from rest_framework import mixins, viewsets

from .filters import ProductFilter
from .models import Brand, Product, ProductCategory
from .serializers import (
    BrandSerializer,
    ProductCategorySerializer,
    ProductDetailSerializer,
    ProductListSerializer,
)


class ActiveQuerysetMixin:
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)


class ProductCategoryViewSet(ActiveQuerysetMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    authentication_classes: list = []
    permission_classes: list = []


class BrandViewSet(ActiveQuerysetMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    authentication_classes: list = []
    permission_classes: list = []


class ProductViewSet(
    ActiveQuerysetMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Product.objects.select_related('category', 'brand').prefetch_related(
        'images',
        'features',
        'specifications',
    )
    lookup_field = 'slug'
    filterset_class = ProductFilter
    search_fields = ('name_en', 'name_ar', 'sku', 'short_description_en', 'short_description_ar')
    ordering_fields = ('price', 'name_en', 'created_at', 'display_order')
    ordering = ('display_order', 'name_en')
    authentication_classes: list = []
    permission_classes: list = []

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer
