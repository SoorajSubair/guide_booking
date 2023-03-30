# Generated by Django 4.1.7 on 2023-03-30 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0016_destination_fee'),
    ]

    operations = [
        migrations.AlterField(
            model_name='destination',
            name='fee',
            field=models.DecimalField(decimal_places=2, max_digits=8),
        ),
        migrations.AlterField(
            model_name='destination',
            name='short_info',
            field=models.TextField(default=10.0, max_length=255),
            preserve_default=False,
        ),
    ]
