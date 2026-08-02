from rest_framework import serializers

from .models import CompanyProfile, CompanyValue, Partner, Service, ServiceFeature


class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = ('id', 'text_ar', 'text_en', 'display_order')


class ServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = (
            'id',
            'name_ar',
            'name_en',
            'slug',
            'short_description_ar',
            'short_description_en',
            'icon',
            'cover_image',
            'display_order',
            'is_featured',
        )


class ServiceDetailSerializer(serializers.ModelSerializer):
    features = ServiceFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = (
            'id',
            'name_ar',
            'name_en',
            'slug',
            'short_description_ar',
            'short_description_en',
            'full_description_ar',
            'full_description_en',
            'icon',
            'cover_image',
            'display_order',
            'is_featured',
            'features',
            'created_at',
            'updated_at',
        )


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = (
            'id',
            'name',
            'slug',
            'logo',
            'website_url',
            'description_ar',
            'description_en',
            'display_order',
            'is_featured',
        )


class CompanyValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyValue
        fields = (
            'id',
            'title_ar',
            'title_en',
            'description_ar',
            'description_en',
            'icon',
            'display_order',
        )


class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = (
            'id',
            'name_ar',
            'name_en',
            'short_description_ar',
            'short_description_en',
            'story_ar',
            'story_en',
            'vision_ar',
            'vision_en',
            'mission_ar',
            'mission_en',
            'phone',
            'whatsapp',
            'address_ar',
            'address_en',
            'opening_hours_ar',
            'opening_hours_en',
            'service_coverage_ar',
            'service_coverage_en',
            'installation_area_ar',
            'installation_area_en',
            'facebook_url',
            'instagram_url',
            'google_maps_url',
            'gini_url',
            'logo',
            'updated_at',
        )
