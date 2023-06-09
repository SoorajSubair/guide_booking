# Generated by Django 4.1.7 on 2023-03-30 11:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0017_alter_destination_fee_alter_destination_short_info'),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('is_accepted', models.BooleanField(default=False)),
                ('is_declined', models.BooleanField(default=False)),
                ('trip_started', models.BooleanField(default=False)),
                ('trip_ended', models.BooleanField(default=False)),
                ('is_start_code', models.CharField(max_length=6)),
                ('is_end_code', models.CharField(max_length=6)),
                ('destination', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.destination')),
                ('guide', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookings_as_guide', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookings_as_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_refunded', models.BooleanField(default=False)),
                ('booking', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='API.booking')),
            ],
        ),
        migrations.CreateModel(
            name='GuidePayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=8)),
                ('is_paid', models.BooleanField(default=False)),
                ('booking', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='API.booking')),
            ],
        ),
    ]
