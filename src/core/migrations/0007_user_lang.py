# Generated by Django 2.0.2 on 2018-04-16 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_userrequestlog'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='lang',
            field=models.CharField(choices=[('en', 'en'), ('ru', 'ru')], default='en', max_length=8, verbose_name='language'),
        ),
    ]
