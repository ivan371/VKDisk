from vk_api_wrapper.tasks import download_dialog_list, download_user_documents


def load_user_dialogs(backend, details, response, uid, user, *args, **kwargs):
    if backend.name != 'vk-oauth2':
        return
    social = kwargs.get('social') or \
             backend.strategy.storage.user.get_social_auth(backend.name, uid)
    if social:
        access_token = social.extra_data['access_token']
        user_id = user.pk
        download_dialog_list.apply_async(kwargs={'access_token': access_token, 'user_id': user_id})
        download_user_documents.apply_async(kwargs={'access_token': access_token, 'user_id': user_id})
