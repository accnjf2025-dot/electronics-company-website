from django.contrib import admin
from django.utils.html import format_html

from .models import Project, ProjectCategory, ProjectImage, ProjectService, ProjectSystem


class ReadOnlyTimestampsMixin:
    readonly_fields = ('created_at', 'updated_at')


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ('image', 'alt_text_en', 'alt_text_ar', 'display_order')
    ordering = ('display_order',)


class ProjectSystemInline(admin.TabularInline):
    model = ProjectSystem
    extra = 1
    fields = ('name_en', 'name_ar', 'display_order')
    ordering = ('display_order',)


class ProjectServiceInline(admin.TabularInline):
    model = ProjectService
    extra = 1
    fields = ('service', 'display_order')
    ordering = ('display_order',)
    autocomplete_fields = ('service',)


@admin.register(ProjectCategory)
class ProjectCategoryAdmin(ReadOnlyTimestampsMixin, admin.ModelAdmin):
    list_display = ('name_en', 'slug', 'display_order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name_en', 'name_ar', 'slug')
    prepopulated_fields = {'slug': ('name_en',)}
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Project)
class ProjectAdmin(ReadOnlyTimestampsMixin, admin.ModelAdmin):
    list_display = (
        'title_en',
        'category',
        'status',
        'featured',
        'completion_date',
        'is_active',
    )
    list_filter = ('is_active', 'featured', 'status', 'category', 'confidential')
    search_fields = ('title_en', 'title_ar', 'slug', 'location_en', 'location_ar')
    prepopulated_fields = {'slug': ('title_en',)}
    inlines = [ProjectServiceInline, ProjectImageInline, ProjectSystemInline]
    readonly_fields = ('created_at', 'updated_at', 'cover_preview')
    fieldsets = (
        (
            None,
            {
                'fields': (
                    'category',
                    'title_en',
                    'title_ar',
                    'slug',
                    'status',
                    'featured',
                    'confidential',
                    'display_order',
                    'is_active',
                ),
            },
        ),
        (
            'Client & Location',
            {
                'fields': (
                    'client_name_en',
                    'client_name_ar',
                    'show_client_name',
                    'location_en',
                    'location_ar',
                    'completion_date',
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
            'Case study',
            {
                'fields': (
                    'challenge_en',
                    'challenge_ar',
                    'solution_en',
                    'solution_ar',
                    'result_en',
                    'result_ar',
                ),
            },
        ),
        ('Media', {'fields': ('cover_image', 'cover_preview')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )

    @admin.display(description='Cover preview')
    def cover_preview(self, obj: Project) -> str:
        if obj.cover_image:
            return format_html('<img src="{}" style="max-height:120px;" />', obj.cover_image.url)
        return '—'
