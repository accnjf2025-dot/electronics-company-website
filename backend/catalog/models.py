from decimal import Decimal

from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models

from core.models import ActiveModel, TimeStampedModel, UUIDModel


class ProductCategory(UUIDModel, ActiveModel, TimeStampedModel):
    name_ar = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description_ar = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    icon = models.CharField(max_length=64, blank=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    display_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['display_order', 'name_en']
        verbose_name = 'Product category'
        verbose_name_plural = 'Product categories'

    def __str__(self) -> str:
        return self.name_en


class Brand(UUIDModel, ActiveModel, TimeStampedModel):
    name = models.CharField(max_length=128)
    slug = models.SlugField(max_length=128, unique=True)
    logo = models.ImageField(upload_to='brands/', blank=True, null=True)
    website_url = models.URLField(max_length=500, blank=True)
    display_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['display_order', 'name']

    def __str__(self) -> str:
        return self.name


class Product(UUIDModel, ActiveModel, TimeStampedModel):
    class Availability(models.TextChoices):
        IN_STOCK = 'in_stock', 'In stock'
        ON_REQUEST = 'on_request', 'On request'
        OUT_OF_STOCK = 'out_of_stock', 'Out of stock'

    class Currency(models.TextChoices):
        IQD = 'IQD', 'Iraqi Dinar'

    category = models.ForeignKey(
        ProductCategory,
        related_name='products',
        on_delete=models.PROTECT,
    )
    brand = models.ForeignKey(
        Brand,
        related_name='products',
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    name_ar = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    sku = models.CharField(max_length=64, unique=True)
    short_description_ar = models.TextField()
    short_description_en = models.TextField()
    full_description_ar = models.TextField(blank=True)
    full_description_en = models.TextField(blank=True)
    price = models.DecimalField(
        max_digits=12,
        decimal_places=0,
        validators=[MinValueValidator(Decimal('0'))],
    )
    old_price = models.DecimalField(
        max_digits=12,
        decimal_places=0,
        null=True,
        blank=True,
        validators=[MinValueValidator(Decimal('0'))],
    )
    currency = models.CharField(max_length=3, choices=Currency.choices, default=Currency.IQD)
    availability = models.CharField(
        max_length=20,
        choices=Availability.choices,
        default=Availability.IN_STOCK,
        db_index=True,
    )
    featured = models.BooleanField(default=False, db_index=True)
    delivery_available = models.BooleanField(default=True)
    installation_available = models.BooleanField(default=False)
    installation_area_ar = models.CharField(max_length=255, blank=True)
    installation_area_en = models.CharField(max_length=255, blank=True)
    warranty_available = models.BooleanField(default=False)
    warranty_text_ar = models.TextField(blank=True)
    warranty_text_en = models.TextField(blank=True)
    installment_available = models.BooleanField(default=False, db_index=True)
    after_sales_support = models.BooleanField(default=True)
    main_image = models.ImageField(upload_to='products/', blank=True, null=True)
    display_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['display_order', 'name_en']

    def __str__(self) -> str:
        return self.name_en

    def clean(self) -> None:
        errors: dict[str, str] = {}
        if self.old_price is not None and self.old_price < self.price:
            errors['old_price'] = 'Old price should normally be greater than or equal to the current price.'
        if self.installation_available and not self.installation_area_ar and not self.installation_area_en:
            errors['installation_area_en'] = (
                'Installation area should be provided when installation is available.'
            )
        if errors:
            raise ValidationError(errors)


class ProductImage(UUIDModel):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/gallery/')
    alt_text_ar = models.CharField(max_length=255, blank=True)
    alt_text_en = models.CharField(max_length=255, blank=True)
    display_order = models.PositiveIntegerField(default=0, db_index=True)
    is_primary = models.BooleanField(default=False)

    class Meta:
        ordering = ['display_order']
        constraints = [
            models.UniqueConstraint(
                fields=['product'],
                condition=models.Q(is_primary=True),
                name='unique_primary_product_image',
            ),
        ]

    def __str__(self) -> str:
        return f'{self.product.name_en} image {self.display_order}'

    def save(self, *args, **kwargs):
        if self.is_primary:
            ProductImage.objects.filter(product=self.product, is_primary=True).exclude(pk=self.pk).update(
                is_primary=False
            )
        super().save(*args, **kwargs)


class ProductFeature(UUIDModel):
    product = models.ForeignKey(Product, related_name='features', on_delete=models.CASCADE)
    text_ar = models.CharField(max_length=255)
    text_en = models.CharField(max_length=255)
    display_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['display_order', 'text_en']

    def __str__(self) -> str:
        return self.text_en


class ProductSpecification(UUIDModel):
    product = models.ForeignKey(Product, related_name='specifications', on_delete=models.CASCADE)
    label_ar = models.CharField(max_length=255)
    label_en = models.CharField(max_length=255)
    value_ar = models.CharField(max_length=255)
    value_en = models.CharField(max_length=255)
    display_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['display_order', 'label_en']

    def __str__(self) -> str:
        return f'{self.label_en}: {self.value_en}'
