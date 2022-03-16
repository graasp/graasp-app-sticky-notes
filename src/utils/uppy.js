import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import {
  MAX_NUM_FILES,
  MAX_FILE_SIZE,  
  DEFAULT_VISIBILITY,
} from '../config/settings';
import { API_ROUTES } from '../config/queryClient';
import { showErrorToast } from './toasts';
import { POST_FILE } from '../types';
import { FILE } from '../config/appInstanceResourceTypes';
import { APP_SETTINGS } from '../constants/constants';

const { buildUploadAppSettingFilesRoute } = API_ROUTES;

const configureUppy = ({
  t,
  offline,
  standalone,
  spaceId,
  visibility = DEFAULT_VISIBILITY,
  userId,
  itemId,
  apiHost,
  token,
  onComplete,
}) => {
  const uppy = new Uppy({
    restrictions: {
      maxNumberOfFiles: MAX_NUM_FILES,
      maxFileSize: MAX_FILE_SIZE,
      allowedFileTypes: ['.jpg', '.jpeg', '.png'],
    },
    autoProceed: true,
  });

  // const dispatch = useDispatch();

  // when offline override upload to post corresponding resources
  if (offline) {
    uppy.upload = () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        const {
          data: { path, name },
        } = file;

        return postMessage({
          type: POST_FILE,
          // the payload will be used in the resulting appInstanceResource
          payload: {
            data: { name, path },
            userId,
            spaceId,
            type: FILE,
            visibility,
          },
        });
      });

      // remove files from stack and cancel upload
      uppy.cancelAll();
      return Promise.resolve({ files });
    };
  }

  // endpoint
  uppy.use(XHRUpload, {
    // on standalone flag upload should fail
    endpoint: `${apiHost}/${buildUploadAppSettingFilesRoute(itemId)}`,
    withCredentials: true,
    formData: true,
    metaFields: ['name'],
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
    uppy.setFileMeta(file.id, {
      size: file.size,
      name: APP_SETTINGS.BACKGROUND,
    });
  });

  uppy.on('complete', async (result) => {
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