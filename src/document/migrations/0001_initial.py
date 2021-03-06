# Generated by Django 2.0.2 on 2018-02-24 17:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('folder', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='время отправления')),
                ('title', models.CharField(default=None, max_length=128, verbose_name='название')),
                ('type', models.CharField(default='файл', max_length=128, verbose_name='файл')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='отправитель')),
                ('folder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='folder.Folder', verbose_name='папка')),
            ],
            options={
                'verbose_name': 'файл',
                'verbose_name_plural': 'файлы',
            },
        ),
    ]
