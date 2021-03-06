# Generated by Django 2.0.2 on 2018-03-10 10:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vk_api_wrapper', '0007_auto_20180225_1315'),
        ('folder', '0009_auto_20180308_1228'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatFolder',
            fields=[
                ('folder_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='folder.Folder')),
                ('vk_dialog', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vk_api_wrapper.VkDialog')),
            ],
            options={
                'abstract': False,
                'verbose_name_plural': 'titled',
                'verbose_name': 'titled',
            },
            bases=('folder.folder',),
        ),
    ]
