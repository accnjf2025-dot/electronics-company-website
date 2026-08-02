from rest_framework.routers import DefaultRouter

from .views import BrandViewSet, ProductCategoryViewSet, ProductViewSet

router = DefaultRouter()
router.register('product-categories', ProductCategoryViewSet, basename='product-category')
router.register('brands', BrandViewSet, basename='brand')
router.register('products', ProductViewSet, basename='product')

urlpatterns = router.urls
