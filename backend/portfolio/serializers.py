from rest_framework import serializers

from core.serializers import ServiceListSerializer

from .models import Project, ProjectCategory, ProjectImage, ProjectSystem


class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = (
            'id',
            'name_ar',
            'name_en',
            'slug',
            'description_ar',
            'description_en',
            'display_order',
        )


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = (
            'id',
            'image',
            'alt_text_ar',
            'alt_text_en',
            'display_order',
        )


class ProjectSystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectSystem
        fields = ('id', 'name_ar', 'name_en', 'display_order')


class ProjectListSerializer(serializers.ModelSerializer):
    category = ProjectCategorySerializer(read_only=True)

    class Meta:
        model = Project
        fields = (
            'id',
            'title_ar',
            'title_en',
            'slug',
            'short_description_ar',
            'short_description_en',
            'location_ar',
            'location_en',
            'completion_date',
            'cover_image',
            'featured',
            'status',
            'display_order',
            'category',
            'created_at',
        )


class ProjectDetailSerializer(ProjectListSerializer):
    services = ServiceListSerializer(many=True, read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)
    systems = ProjectSystemSerializer(many=True, read_only=True)

    class Meta(ProjectListSerializer.Meta):
        fields = ProjectListSerializer.Meta.fields + (
            'full_description_ar',
            'full_description_en',
            'challenge_ar',
            'challenge_en',
            'solution_ar',
            'solution_en',
            'result_ar',
            'result_en',
            'client_name_ar',
            'client_name_en',
            'show_client_name',
            'confidential',
            'services',
            'images',
            'systems',
            'updated_at',
        )

    def to_representation(self, instance: Project) -> dict:
        data = super().to_representation(instance)
        if not instance.show_client_name or instance.confidential:
            data.pop('client_name_ar', None)
            data.pop('client_name_en', None)
        return data
