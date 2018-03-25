import tempfile


def upload_file_handler(user, f_obj):
    tmp_file_name = None
    with tempfile.NamedTemporaryFile(mode='w+b', delete=False) as tmp_file:
        for chunk in f_obj.chunks():
            tmp_file.write(chunk)
        tmp_file_name = tmp_file.name


