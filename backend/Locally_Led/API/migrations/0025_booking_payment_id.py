# Generated by Django 4.1.7 on 2023-04-04 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0024_customuser_wallet'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='payment_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]