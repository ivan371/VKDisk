# Generated by Django 2.0.2 on 2018-02-24 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('folder', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='folder',
            name='type',
            field=models.CharField(default='папка', max_length=128, verbose_name='тип папки'),
        ),
    ]
