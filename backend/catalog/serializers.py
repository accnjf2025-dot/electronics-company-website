from rest_framework import serializers

from .models import (
    Brand,
    Product,
    ProductCategory,
    ProductFeature,
    ProductImage,
    ProductSpecification,
)


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = (
            'id',
            'name_ar',
            'name_en',
            'slug',
            'description_ar',
            'description_en',
            'icon',
            'image',
            'display_order',
        )


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = (
            'id',
            'name',
            'slug',
            'logo',
            'website_url',
            'display_order',
        )


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = (
            'id',
            'image',
            'alt_text_ar',
            'alt_text_en',
            'display_order',
            'is_primary',
        )


class ProductFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFeature
        fields = ('id', 'text_ar', 'text_en', 'display_order')


class ProductSpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpecification
        fields = (
            'id',
            'label_ar',
            'label_en',
            'value_ar',
            'value_en',
            'display_order',
        )


class ProductListSerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)

    class Meta:
        model = Product
        fields = (
            'id',
            'name_ar',
            'name_en',
            'slug',
            'sku',
            'short_description_ar',
            'short_description_en',
            'price',
            'old_price',
            'currency',
            'availability',
            'featured',
            'delivery_available',
            'installation_available',
            'installment_available',
            'warranty_available',
            'after_sales_support',
            'main_image',
            'display_order',
            'category',
            'brand',
            'created_at',
        )


class ProductDetailSerializer(ProductListSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    features = ProductFeatureSerializer(many=True, read_only=True)
    specifications = ProductSpecificationSerializer(many=True, read_only=True)

    class Meta(ProductListSerializer.Meta):
        fields = ProductListSerializer.Meta.fields + (
            'full_description_ar',
            'full_description_en',
            'installation_area_ar',
            'installation_area_en',
            'warranty_text_ar',
            'warranty_text_en',
            'images',
            'features',
            'specifications',
            'updated_at',
        )
