# Generated by Django 2.0.2 on 2018-04-11 20:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('folder', '0011_auto_20180310_1031'),
    ]

    operations = [
        migrations.AddField(
            model_name='folder',
            name='typeForElasticSearchPleaseDontTouchMe',
            field=models.CharField(choices=[('folder', 'folder'), ('chat', 'chat'), ('root', 'root'), ('sorted', 'sorted'), ('favorite', 'favorite')], default='folder', max_length=128, verbose_name='type of folder'),
        ),
    ]
