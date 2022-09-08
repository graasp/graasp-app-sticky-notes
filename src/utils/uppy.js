import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { MAX_NUM_FILES, MAX_FILE_SIZE } from '../config/settings';
import { API_ROUTES } from '../config/queryClient';
import { showErrorToast, showSuccessToast } from './toasts';
import { APP_SETTINGS } from '../constants/constants';

const { buildUploadAppSettingFilesRoute } = API_ROUTES;

const configureUppy = ({
  t,
  standalone,
  itemId,
  apiHost,
  token,
  onComplete,
}) => {
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
    allowMetaFields: ['name'],
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
    showSuccessToast(t('File added.'));
    uppy.setFileMeta(file.id, {
      size: file.size,
      name: APP_SETTINGS.BACKGROUND,
    });
  });

  uppy.on('complete', async (result) => {
    showSuccessToast(t('Upload complete.'));
    // run mutation to invalidate app setting key
    onComplete(result);
  });

  uppy.on('error', (file, error) => {
    if (standalone) {
      showErrorToast(t('This is just a preview. No files can be uploaded.'));
    } else {
      showErrorToast(error);
    }
  });

  uppy.on('upload-error', (file, error, response) => {
    if (standalone) {
      showErrorToast(t('This is just a preview. No files can be uploaded.'));
    } else {
      showErrorToast(response);
    }
  });

  uppy.on('restriction-failed', (file, error) => {
    if (standalone) {
      showErrorToast(t('This is just a preview. No files can be uploaded.'));
    } else {
      showErrorToast(error);
    }
  });

  return uppy;
};

export default configureUppy;
