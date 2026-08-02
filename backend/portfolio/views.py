from rest_framework import mixins, viewsets

from .filters import ProjectFilter
from .models import Project, ProjectCategory
from .serializers import ProjectCategorySerializer, ProjectDetailSerializer, ProjectListSerializer


class ActiveQuerysetMixin:
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)


class ProjectCategoryViewSet(ActiveQuerysetMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer
    authentication_classes: list = []
    permission_classes: list = []


class ProjectViewSet(
    ActiveQuerysetMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Project.objects.select_related('category').prefetch_related(
        'services',
        'images',
        'systems',
    )
    lookup_field = 'slug'
    filterset_class = ProjectFilter
    search_fields = (
        'title_en',
        'title_ar',
        'short_description_en',
        'short_description_ar',
        'location_en',
        'location_ar',
    )
    ordering_fields = ('completion_date', 'title_en', 'created_at', 'display_order')
    ordering = ('display_order', '-completion_date')
    authentication_classes: list = []
    permission_classes: list = []

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer
