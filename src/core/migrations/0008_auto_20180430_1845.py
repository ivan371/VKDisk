# Generated by Django 2.0.2 on 2018-04-30 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_user_lang'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.TextField(blank=True, default='avatars/default-avatar.jpg'),
        ),
    ]
