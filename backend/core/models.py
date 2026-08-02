import uuid

from django.core.exceptions import ValidationError
from django.db import models


class UUIDModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ActiveModel(models.Model):
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        abstract = True


class CompanyProfile(UUIDModel, ActiveModel, TimeStampedModel):
    name_ar = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255)
    short_description_ar = models.TextField()
    short_description_en = models.TextField()
    story_ar = models.TextField()
    story_en = models.TextField()
    vision_ar = models.TextField()
    vision_en = models.TextField()
    mission_ar = models.TextField()
    mission_en = models.TextField()
    phone = models.CharField(max_length=32)
    whatsapp = models.CharField(max_length=32)
    address_ar = models.CharField(max_length=255)
    address_en = models.CharField(max_length=255)
    opening_hours_ar = models.CharField(max_length=128)
    opening_hours_en = models.CharField(max_length=128)
    service_coverage_ar = models.TextField()
    service_coverage_en = models.TextField()
    installation_area_ar = models.CharField(max_length=255)
    installation_area_en = models.CharField(max_length=255)
    facebook_url = models.URLField(max_length=500, blank=True)
    instagram_url = models.URLField(max_length=500, blank=True)
    google_maps_url = models.URLField(max_length=500, blank=True)
    gini_url = models.URLField(max_length=500, blank=True)
    logo = models.ImageField(upload_to='company/', blank=True, null=True)

    class Meta:
        verbose_name = 'Company profile'
        verbose_name_plural = 'Company profile'
        constraints = [
            models.UniqueConstraint(
                fields=['is_active'],
                condition=models.Q(is_active=True),
                name='unique_active_company_profile',
            ),
        ]

    def __str__(self) -> str:
        return self.name_en

    def save(self, *args, **kwargs):
        if self.is_active:
            CompanyProfile.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)


class CompanyValue(UUIDModel, ActiveModel):
    title_ar = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    description_ar = models.TextField()
    description_en = models.TextField()
    icon = models.CharField(max_length=64, blank=True)
    display_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['display_order', 'title_en']
        verbose_name = 'Company value'
        verbose_name_plural = 'Company values'

    def __str__(self) -> str:
        return self.title_en


class Service(UUIDModel, ActiveModel, TimeStampedModel):
    name_ar = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    short_description_ar = models.TextField()
    short_description_en = models.TextField()
    full_description_ar = models.TextField(blank=True)
    full_description_en = models.TextField(blank=True)
    icon = models.CharField(max_length=64, blank=True)
    cover_image = models.ImageField(upload_to='services/', blank=True, null=True)
    display_order = models.PositiveIntegerField(default=0, db_index=True)
    is_featured = models.BooleanField(default=False, db_index=True)

    class Meta:
        ordering = ['display_order', 'name_en']

    def __str__(self) -> str:
        return self.name_en


class ServiceFeature(UUIDModel):
    service = models.ForeignKey(Service, related_name='features', on_delete=models.CASCADE)
    text_ar = models.CharField(max_length=255)
    text_en = models.CharField(max_length=255)
    display_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['display_order', 'text_en']
        verbose_name = 'Service feature'
        verbose_name_plural = 'Service features'

    def __str__(self) -> str:
        return self.text_en


class Partner(UUIDModel, ActiveModel, TimeStampedModel):
    name = models.CharField(max_length=128)
    slug = models.SlugField(max_length=128, unique=True)
    logo = models.ImageField(upload_to='partners/', blank=True, null=True)
    website_url = models.URLField(max_length=500, blank=True)
    description_ar = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    display_order = models.PositiveIntegerField(default=0, db_index=True)
    is_featured = models.BooleanField(default=False, db_index=True)

    class Meta:
        ordering = ['display_order', 'name']

    def __str__(self) -> str:
        return self.name
