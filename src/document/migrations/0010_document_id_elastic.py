# Generated by Django 2.0.2 on 2018-04-15 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('document', '0009_auto_20180411_2018'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='id_elastic',
            field=models.CharField(default='1', max_length=1024),
        ),
    ]
