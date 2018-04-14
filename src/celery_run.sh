celery -A application worker -l info -P eventlet -c 1000 &
celery -A application worker -l info -B