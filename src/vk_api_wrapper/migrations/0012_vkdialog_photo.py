# Generated by Django 2.0.2 on 2018-04-29 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vk_api_wrapper', '0011_auto_20180310_1738'),
    ]

    operations = [
        migrations.AddField(
            model_name='vkdialog',
            name='photo',
            field=models.TextField(default=None, null=True),
        ),
    ]