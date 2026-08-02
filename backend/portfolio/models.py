from django.db import models

from core.models import ActiveModel, TimeStampedModel, UUIDModel


class ProjectCategory(UUIDModel, ActiveModel, TimeStampedModel):
    name_ar = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description_ar = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    display_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['display_order', 'name_en']
        verbose_name = 'Project category'
        verbose_name_plural = 'Project categories'

    def __str__(self) -> str:
        return self.name_en


class Project(UUIDModel, ActiveModel, TimeStampedModel):
    class Status(models.TextChoices):
        PLANNED = 'planned', 'Planned'
        IN_PROGRESS = 'in_progress', 'In progress'
        COMPLETED = 'completed', 'Completed'

    category = models.ForeignKey(
        ProjectCategory,
        related_name='projects',
        on_delete=models.PROTECT,
    )
    title_ar = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    client_name_ar = models.CharField(max_length=255, blank=True)
    client_name_en = models.CharField(max_length=255, blank=True)
    show_client_name = models.BooleanField(default=False)
    location_ar = models.CharField(max_length=255)
    location_en = models.CharField(max_length=255)
    completion_date = models.DateField(null=True, blank=True, db_index=True)
    short_description_ar = models.TextField()
    short_description_en = models.TextField()
    full_description_ar = models.TextField(blank=True)
    full_description_en = models.TextField(blank=True)
    challenge_ar = models.TextField(blank=True)
    challenge_en = models.TextField(blank=True)
    solution_ar = models.TextField(blank=True)
    solution_en = models.TextField(blank=True)
    result_ar = models.TextField(blank=True)
    result_en = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='projects/', blank=True, null=True)
    featured = models.BooleanField(default=False, db_index=True)
    confidential = models.BooleanField(default=False)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.COMPLETED,
        db_index=True,
    )
    display_order = models.PositiveIntegerField(default=0, db_index=True)
    services = models.ManyToManyField(
        'core.Service',
        through='ProjectService',
        related_name='projects',
        blank=True,
    )

    class Meta:
        ordering = ['display_order', '-completion_date', 'title_en']

    def __str__(self) -> str:
        return self.title_en


class ProjectService(UUIDModel):
    project = models.ForeignKey(Project, related_name='project_services', on_delete=models.CASCADE)
    service = models.ForeignKey('core.Service', related_name='project_services', on_delete=models.CASCADE)
    display_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['display_order']
        constraints = [
            models.UniqueConstraint(fields=['project', 'service'], name='unique_project_service'),
        ]

    def __str__(self) -> str:
        return f'{self.project.title_en} – {self.service.name_en}'


class ProjectImage(UUIDModel):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/gallery/')
    alt_text_ar = models.CharField(max_length=255, blank=True)
    alt_text_en = models.CharField(max_length=255, blank=True)
    display_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self) -> str:
        return f'{self.project.title_en} image {self.display_order}'


class ProjectSystem(UUIDModel):
    project = models.ForeignKey(Project, related_name='systems', on_delete=models.CASCADE)
    name_ar = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255)
    display_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['display_order', 'name_en']

    def __str__(self) -> str:
        return self.name_en
