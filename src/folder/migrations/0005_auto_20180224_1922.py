# Generated by Django 2.0.2 on 2018-02-24 19:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('folder', '0004_auto_20180224_1913'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='folder',
            options={'verbose_name': 'folder', 'verbose_name_plural': 'folders'},
        ),
        migrations.AlterField(
            model_name='folder',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='author'),
        ),
        migrations.AlterField(
            model_name='folder',
            name='root',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='folder.Folder', verbose_name='root'),
        ),
        migrations.AlterField(
            model_name='folder',
            name='title',
            field=models.CharField(default=None, max_length=128, verbose_name='title'),
        ),
        migrations.AlterField(
            model_name='folder',
            name='type',
            field=models.CharField(default='folder', max_length=128, verbose_name='type of folder'),
        ),
    ]
