# Generated by Django 2.0.2 on 2018-02-25 13:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('vk_api_wrapper', '0005_auto_20180225_1030'),
    ]

    operations = [
        migrations.CreateModel(
            name='DocAttachment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vk_id', models.IntegerField()),
                ('vk_owner_id', models.IntegerField()),
                ('vk_access_key', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=1023)),
                ('size', models.IntegerField()),
                ('ext', models.CharField(max_length=10)),
                ('url', models.TextField()),
                ('date', models.IntegerField()),
                ('type', models.IntegerField(choices=[('Text document', 1), ('Archive', 2), ('Gif', 3), ('Image', 4), ('Audio', 5), ('Video', 6), ('E-Book', 7), ('Unknown', 8)])),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='VkMessagesList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_from', models.BigIntegerField(default=None, null=True)),
                ('dialog', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='vk_api_wrapper.VkDialog')),
            ],
        ),
    ]
