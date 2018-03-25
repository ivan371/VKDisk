import httplib2
import os
from googleapiclient import discovery
from googleapiclient.http import MediaFileUpload
from oauth2client.client import AccessTokenCredentials


def upload_file_to_gdrive(access_token, filepath):
    def bacth_permission_callback(request_id, response, exception):
        if exception:
            # Handle error
            print(exception)
        else:
            print("Permission Id: %s" % response.get('id'))

    credentials = AccessTokenCredentials(access_token, 'vk_disk_agent/1.0')
    http = httplib2.Http()
    http = credentials.authorize(http)

    service = discovery.build('drive', 'v3', http=http)
    head, filename = os.path.split(filepath)
    media_file = MediaFileUpload(filepath)
    file = service.files().create(body={'name': filename},
                                  media_body=media_file,
                                  fields='id,webContentLink,webViewLink'
                                  ).execute()
    batch = service.new_batch_http_request(callback=bacth_permission_callback)
    everyone_permission = {
        'type': 'anyone',
        'role': 'reader',
    }
    batch.add(service.permissions().create(
        fileId=file['id'],
        body=everyone_permission,
        fields='id',
    ))
    batch.execute()
    return file
