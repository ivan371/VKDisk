# Generated by Django 2.0.2 on 2018-04-11 20:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('document', '0008_document_text'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='documentdata',
            name='document',
        ),
        migrations.DeleteModel(
            name='DocumentData',
        ),
    ]
