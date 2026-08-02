from django.contrib import admin
from django.utils.html import format_html

from .models import CompanyProfile, CompanyValue, Partner, Service, ServiceFeature


class ReadOnlyTimestampsMixin:
    readonly_fields = ('created_at', 'updated_at')


@admin.register(CompanyProfile)
class CompanyProfileAdmin(ReadOnlyTimestampsMixin, admin.ModelAdmin):
    list_display = ('name_en', 'name_ar', 'phone', 'is_active', 'updated_at')
    list_filter = ('is_active',)
    search_fields = ('name_en', 'name_ar', 'phone')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Identity', {'fields': ('name_en', 'name_ar', 'logo', 'is_active')}),
        (
            'Descriptions',
            {'fields': ('short_description_en', 'short_description_ar', 'story_en', 'story_ar')},
        ),
        ('Vision & Mission', {'fields': ('vision_en', 'vision_ar', 'mission_en', 'mission_ar')}),
        (
            'Contact',
            {
                'fields': (
                    'phone',
                    'whatsapp',
                    'address_en',
                    'address_ar',
                    'opening_hours_en',
                    'opening_hours_ar',
                ),
            },
        ),
        (
            'Coverage',
            {
                'fields': (
                    'service_coverage_en',
                    'service_coverage_ar',
                    'installation_area_en',
                    'installation_area_ar',
                ),
            },
        ),
        (
            'Links',
            {'fields': ('facebook_url', 'instagram_url', 'google_maps_url', 'gini_url')},
        ),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )


@admin.register(CompanyValue)
class CompanyValueAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'title_ar', 'display_order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title_en', 'title_ar')
    ordering = ('display_order', 'title_en')


class ServiceFeatureInline(admin.TabularInline):
    model = ServiceFeature
    extra = 1
    fields = ('text_en', 'text_ar', 'display_order')
    ordering = ('display_order',)


@admin.register(Service)
class ServiceAdmin(ReadOnlyTimestampsMixin, admin.ModelAdmin):
    list_display = ('name_en', 'slug', 'is_featured', 'display_order', 'is_active')
    list_filter = ('is_active', 'is_featured')
    search_fields = ('name_en', 'name_ar', 'slug')
    prepopulated_fields = {'slug': ('name_en',)}
    inlines = [ServiceFeatureInline]
    readonly_fields = ('created_at', 'updated_at', 'cover_preview')
    fieldsets = (
        (
            None,
            {
                'fields': (
                    'name_en',
                    'name_ar',
                    'slug',
                    'icon',
                    'is_featured',
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
        ('Media', {'fields': ('cover_image', 'cover_preview')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )

    @admin.display(description='Cover preview')
    def cover_preview(self, obj: Service) -> str:
        if obj.cover_image:
            return format_html('<img src="{}" style="max-height:120px;" />', obj.cover_image.url)
        return '—'


@admin.register(Partner)
class PartnerAdmin(ReadOnlyTimestampsMixin, admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_featured', 'display_order', 'is_active')
    list_filter = ('is_active', 'is_featured')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at', 'logo_preview')

    fieldsets = (
        (
            None,
            {
                'fields': (
                    'name',
                    'slug',
                    'website_url',
                    'is_featured',
                    'display_order',
                    'is_active',
                ),
            },
        ),
        ('Descriptions', {'fields': ('description_en', 'description_ar')}),
        ('Media', {'fields': ('logo', 'logo_preview')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )

    @admin.display(description='Logo preview')
    def logo_preview(self, obj: Partner) -> str:
        if obj.logo:
            return format_html('<img src="{}" style="max-height:80px;" />', obj.logo.url)
        return '—'
