# Generated by Django 2.0.2 on 2018-02-25 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('document', '0003_auto_20180224_1922'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='access_token',
            field=models.CharField(blank=True, max_length=128, null=True, verbose_name='access_token'),
        ),
        migrations.AddField(
            model_name='document',
            name='id_owner',
            field=models.IntegerField(default=0, verbose_name='owner'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='document',
            name='id_source',
            field=models.IntegerField(default=0, verbose_name='source'),
            preserve_default=False,
        ),
    ]
