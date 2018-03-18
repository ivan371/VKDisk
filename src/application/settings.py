"""
Django settings for application project.

Generated by 'django-admin startproject' using Django 2.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os
import dj_database_url
from configparser import ConfigParser

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_DIR = os.path.dirname(BASE_DIR)

config = ConfigParser()
config.read(os.path.join(os.path.dirname(BASE_DIR), 'django.conf'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config.get('main', 'SECRET')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'core.apps.CoreConfig',
    'document.apps.DocumentConfig',
    'folder.apps.FolderConfig',
    'rest_api.apps.RestApiConfig',
    'vk_api_wrapper.apps.VkApiWrapperConfig',
    'social_django',
    'debug_toolbar',
    'elasticsearch_dsl',
    'rest_framework_elasticsearch',
    'django_elasticsearch'
    # 'widget_tweaks'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]


AUTHENTICATION_BACKENDS = (
    'core.oauth2_backends.VKOAuth2',
    'social_core.backends.open_id.OpenIdAuth',
    'django.contrib.auth.backends.ModelBackend',
)

SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    'social_core.pipeline.social_auth.associate_by_email',
    'social_core.pipeline.user.create_user',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
    'vk_api_wrapper.pipline.load_user_dialogs',
)

SOCIAL_AUTH_VK_OAUTH2_KEY = config.get('VK', 'APP_ID')
SOCIAL_AUTH_VK_OAUTH2_SECRET = config.get('VK', 'SECRET_KEY')
SOCIAL_AUTH_VK_OAUTH2_SCOPE = ['email', 'status', 'docs', 'messages']
SOCIAL_AUTH_VK_APP_USER_MODE = 2

# User settings
AUTH_USER_MODEL = 'core.User'

ROOT_URLCONF = 'application.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'application.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.parse(config.get("main", "DB_URL"))
}


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

INTERNAL_IPS = '127.0.0.1'

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_api.pagination.ResultsSetPagination',
    # 'PAGE_SIZE': 2
}



# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(PROJECT_DIR, 'collected_static/')
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static/'), os.path.join(BASE_DIR, '../frontend/static/'))

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(PROJECT_DIR, 'media/')


VK_APP_ID = config.getint("VK", "APP_ID")
VK_CLIENT_SECRET_KEY = config.get("VK", "SECRET_KEY")
VK_SERVICE_KEY = config.get("VK", "SERVICE_KEY")

# CELERY
CELERY_RESULT_BACKEND = 'celery.backends.redis.RedisBackend'
CELERY_BROKER_URL = 'redis://{}:{}/{}'.format(config.get("CELERY", "REDIS_HOST"),
                                              config.getint("CELERY", "REDIS_PORT"),
                                              config.getint("CELERY", "REDIS_QUEUE"),
                                              )
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
# CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers.DatabaseScheduler'

ELASTICSEARCH_URL='http://localhost:9200'
ELASTICSEARCH_DEFAULT_INDEX = 'document'
ELASTICSEARCH_AUTO_INDEX = True
