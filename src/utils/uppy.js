// import { useDispatch } from 'react-redux';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import {
  MAX_FILE_SIZE,
  MAX_NUM_FILES,
  DEFAULT_VISIBILITY,
} from '../config/settings';
import { API_ROUTES } from '../config/queryClient';
import { showErrorToast } from './toasts';
import { POST_FILE } from '../types';
import { postMessage } from '../actions/common';
import { FILE } from '../config/appInstanceResourceTypes';
import { APP_SETTINGS } from '../constants/constants';
// import { addImage } from '../actions';

const { buildUploadAppSettingFilesRoute } = API_ROUTES;

const configureUppy = ({
  t,
  offline,
  standalone,
  spaceId,
  appInstanceId,
  visibility = DEFAULT_VISIBILITY,
  // patchAppInstance,
  userId,
  itemId,
  apiHost,
  token,
  onComplete,
}) => {
  const uppy = Uppy({
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
            appInstanceId,
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

    // delete old background image on server
    // await fetch(oldImageUri, {
    //   method: 'DELETE',
    //   headers: { 'content-type': 'application/json' },
    //   credentials: undefined,
    // });

    // de-structure uri and name of new background image from object returned by uppy
    // note that in config/settings.js MAX_NUM_FILES = 1, i.e. we allow only one image upload at a time
    // hence, the { successful } array returned by uppy will only contain one item, at index 0
    // const {
    //   response: { body: newImageUri },
    //   name,
    // } = successful[0];
    // update appInstance settings in redux store with uri and name of the added background image
    // this data is then accessed by the <img> element which renders the background in Canvas.js
    // dispatch(
    //   patchAppInstance({
    //     data: {
    //       backgroundImage: {
    //         name,
    //         uri: newImageUri,
    //         visible: true,
    //       },
    //     },
    //   }),
    // );

    // clear image-being-uploaded from redux store (i.e. set it to empty object)
    // dispatch(addImage({}));
  });

  uppy.on('error', (file, error) => {
    // dispatch(addImage({}));
    if (standalone) {
      showErrorToast(t('This is just a preview. No files can be uploaded.'));
    } else {
      showErrorToast(error);
    }
  });

  uppy.on('upload-error', (file, error, response) => {
    // dispatch(addImage({}));
    if (standalone) {
      showErrorToast(t('This is just a preview. No files can be uploaded.'));
    } else {
      showErrorToast(response);
    }
  });

  uppy.on('restriction-failed', (file, error) => {
    // dispatch(addImage({}));
    if (standalone) {
      showErrorToast(t('This is just a preview. No files can be uploaded.'));
    } else {
      showErrorToast(error);
    }
  });

  return uppy;
};

export default configureUppy;
