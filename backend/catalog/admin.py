from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Brand,
    Product,
    ProductCategory,
    ProductFeature,
    ProductImage,
    ProductSpecification,
)


class ReadOnlyTimestampsMixin:
    readonly_fields = ('created_at', 'updated_at')


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image', 'alt_text_en', 'alt_text_ar', 'display_order', 'is_primary')
    ordering = ('display_order',)


class ProductFeatureInline(admin.TabularInline):
    model = ProductFeature
    extra = 1
    fields = ('text_en', 'text_ar', 'display_order')
    ordering = ('display_order',)


class ProductSpecificationInline(admin.TabularInline):
    model = ProductSpecification
    extra = 1
    fields = ('label_en', 'label_ar', 'value_en', 'value_ar', 'display_order')
    ordering = ('display_order',)


@admin.register(ProductCategory)
class ProductCategoryAdmin(ReadOnlyTimestampsMixin, admin.ModelAdmin):
    list_display = ('name_en', 'slug', 'display_order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name_en', 'name_ar', 'slug')
    prepopulated_fields = {'slug': ('name_en',)}
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Brand)
class BrandAdmin(ReadOnlyTimestampsMixin, admin.ModelAdmin):
    list_display = ('name', 'slug', 'display_order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at', 'logo_preview')

    @admin.display(description='Logo preview')
    def logo_preview(self, obj: Brand) -> str:
        if obj.logo:
            return format_html('<img src="{}" style="max-height:80px;" />', obj.logo.url)
        return '—'


@admin.register(Product)
class ProductAdmin(ReadOnlyTimestampsMixin, admin.ModelAdmin):
    list_display = (
        'name_en',
        'sku',
        'category',
        'brand',
        'price',
        'availability',
        'featured',
        'is_active',
    )
    list_filter = (
        'is_active',
        'featured',
        'availability',
        'category',
        'brand',
        'installment_available',
        'warranty_available',
        'installation_available',
    )
    search_fields = ('name_en', 'name_ar', 'slug', 'sku')
    prepopulated_fields = {'slug': ('name_en',)}
    inlines = [ProductImageInline, ProductFeatureInline, ProductSpecificationInline]
    readonly_fields = ('created_at', 'updated_at', 'main_image_preview')
    fieldsets = (
        (
            None,
            {
                'fields': (
                    'category',
                    'brand',
                    'name_en',
                    'name_ar',
                    'slug',
                    'sku',
                    'display_order',
                    'is_active',
                ),
            },
        ),
        (
            'Descriptions',
            {
                'fields': (
                    'short_description_en',
                    'short_description_ar',
                    'full_description_en',
                    'full_description_ar',
                ),
            },
        ),
        (
            'Pricing',
            {'fields': ('price', 'old_price', 'currency', 'availability', 'featured')},
        ),
        (
            'Services',
            {
                'fields': (
                    'delivery_available',
                    'installation_available',
                    'installation_area_en',
                    'installation_area_ar',
                    'warranty_available',
                    'warranty_text_en',
                    'warranty_text_ar',
                    'installment_available',
                    'after_sales_support',
                ),
            },
        ),
        ('Media', {'fields': ('main_image', 'main_image_preview')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )

    @admin.display(description='Main image preview')
    def main_image_preview(self, obj: Product) -> str:
        if obj.main_image:
            return format_html('<img src="{}" style="max-height:120px;" />', obj.main_image.url)
        return '—'
