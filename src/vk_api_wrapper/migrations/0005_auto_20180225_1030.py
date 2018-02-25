# Generated by Django 2.0.2 on 2018-02-25 10:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vk_api_wrapper', '0004_auto_20180225_1008'),
    ]

    operations = [
        migrations.AddField(
            model_name='vkdialog',
            name='is_chat',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='vkdialog',
            name='chat_id',
            field=models.IntegerField(default=None, null=True),
        ),
    ]
