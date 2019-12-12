# Generated by Django 2.2.7 on 2019-11-24 19:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('isbn', models.CharField(max_length=13, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=40)),
                ('edition', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Has',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(choices=[('VP', 'Very Poor'), ('P', 'Poor'), ('O', 'Okay'), ('G', 'Good'), ('LN', 'Like New')], default='G', max_length=2)),
                ('added_at', models.DateTimeField(auto_now_add=True)),
                ('isbn', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='books.Book')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]