import os
from celery import Celery

# set the default Django settings module for the 'celery' program.
from kombu import Queue

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'application.settings')

app = Celery('application')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


app.conf.beat_schedule = {
    'update_online_every_minute': {
        'task': 'vk_api_wrapper.tasks.update_data_on_online_users',
        'schedule': 60.0,
        'args': (60.0, )
    },
}

app.conf.task_queues = (
    Queue('default', routing_key='default'),
    Queue('vk', routing_key='vk'),
    Queue('beat', routing_key='beat'),
    Queue('text', routing_key='media.text')
)

app.conf.task_default_queue = 'default'

app.conf.task_routes = {
    'vk_api_wrapper.tasks.download_dialog_list': {'queue': 'vk', 'delivery_mode': 'transient'},
    'vk_api_wrapper.tasks.download_dialog_history': {'queue': 'vk', 'delivery_mode': 'transient'},
    'vk_api_wrapper.tasks.download_user_documents': {'queue': 'vk', 'delivery_mode': 'transient'},
    'vk_api_wrapper.tasks.update_data_on_online_users': {'queue': 'beat', 'delivery_mode': 'transient'},
    'document.tasks.load_document_text': {'queue': 'text'},
}


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
