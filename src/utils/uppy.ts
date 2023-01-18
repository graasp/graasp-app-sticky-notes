import { TFunction } from 'i18next';

import Uppy, { UploadResult } from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';

import { APP_SETTINGS } from '../config/constants';
import { API_ROUTES } from '../config/queryClient';
import { MAX_FILE_SIZE, MAX_NUM_FILES } from '../config/settings';
import { showErrorToast, showSuccessToast } from './toasts';

const { buildUploadAppSettingFilesRoute } = API_ROUTES;

interface configureUppyInterface {
  t: TFunction;
  standalone: boolean;
  itemId: string;
  apiHost: string;
  token: string;
  onComplete: (result: UploadResult<Record<string, unknown>>) => void;
}

const configureUppy = (args: configureUppyInterface): Uppy => {
  const { t, standalone, itemId, apiHost, token, onComplete } = args;
  const uppy = new Uppy({
    restrictions: {
      maxNumberOfFiles: MAX_NUM_FILES,
      maxFileSize: MAX_FILE_SIZE,
      allowedFileTypes: ['.jpg', '.jpeg', '.png', '.svg'],
    },
    autoProceed: true,
  });

  // endpoint
  uppy.use(XHRUpload, {
    // on standalone flag upload should fail
    endpoint: `${apiHost}/${buildUploadAppSettingFilesRoute(itemId)}`,
    withCredentials: true,
    formData: true,
    allowedMetaFields: ['name'],
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  // this is used to provide a visual indicator that a file is being uploaded
  // when a file is chosen, its details are dispatched to redux store
  // while it uploads, there is a flashing notice in ImageUpload.js with the file name being uploaded
  // uppy.on('file-added', (file) => dispatch(addImage(file)));
  uppy.on('file-added', (file) => {
    // set name of the settings alongside the file
    showSuccessToast(t('File added.') ?? 'File');
    uppy.setFileMeta(file.id, {
      size: file.size,
      name: APP_SETTINGS.BACKGROUND,
    });
  });

  uppy.on('complete', async (result) => {
    showSuccessToast(t('Upload complete.', 'Upload complete.'));
    // run mutation to invalidate app setting key
    onComplete(result);
  });

  uppy.on('error', (error) => {
    if (standalone) {
      showErrorToast(
        t(
          'PREVIEW_NO_UPLOAD',
          'This is just a preview. No files can be uploaded.',
        ),
      );
    } else {
      showErrorToast(error);
    }
  });

  uppy.on('upload-error', (file, error, response) => {
    if (standalone) {
      showErrorToast(
        t(
          'PREVIEW_NO_UPLOAD',
          'This is just a preview. No files can be uploaded.',
        ),
      );
    } else if (response) {
      const { status, body } = response;
      showErrorToast(
        t('UPLOAD_ERROR_STATUS', 'Status: {{ status }}\n{{ body }}', {
          status,
          body,
        }),
      );
    }
  });

  uppy.on('restriction-failed', (file, error) => {
    if (standalone) {
      showErrorToast(
        t(
          'PREVIEW_NO_UPLOAD',
          'This is just a preview. No files can be uploaded.',
        ),
      );
    } else {
      showErrorToast(error);
    }
  });

  return uppy;
};

export default configureUppy;
