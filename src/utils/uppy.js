import { useDispatch } from 'react-redux';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import {
  MAX_FILE_SIZE,
  MAX_NUM_FILES,
  DEFAULT_VISIBILITY,
} from '../config/settings';
import { FILE_UPLOAD_ENDPOINT } from '../config/api';
import { showErrorToast } from './toasts';
import { POST_FILE } from '../types';
import { postMessage } from '../actions/common';
import { FILE } from '../config/appInstanceResourceTypes';
import { addImage } from '../actions';
import { IMAGE_STRING } from '../constants/constants';

const configureUppy = ({
  t,
  offline,
  standalone,
  spaceId,
  appInstanceId,
  visibility = DEFAULT_VISIBILITY,
  postAppInstanceResource,
  userId,
}) => {
  const uppy = Uppy({
    restrictions: {
      maxNumberOfFiles: MAX_NUM_FILES,
      maxFileSize: MAX_FILE_SIZE,
      allowedFileTypes: ['.jpg', '.jpeg', '.png'],
    },
    autoProceed: true,
  });

  const dispatch = useDispatch();

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
    endpoint: standalone || FILE_UPLOAD_ENDPOINT,
  });

  uppy.on('file-added', (file) => dispatch(addImage(file)));

  uppy.on('complete', ({ successful }) => {
    dispatch(addImage({}));
    successful.forEach(({ response: { body: uri }, name }) => {
      dispatch(
        postAppInstanceResource({
          data: {
            name,
            uri,
            date: Date.now(),
            type: IMAGE_STRING,
          },
          userId,
          visibility,
        }),
      );
    });
  });

  uppy.on('error', (file, error) => {
    dispatch(addImage({}));
    if (standalone) {
      showErrorToast(t('This is just a preview. No files can be uploaded.'));
    } else {
      showErrorToast(error);
    }
  });

  uppy.on('upload-error', (file, error, response) => {
    dispatch(addImage({}));
    if (standalone) {
      showErrorToast(t('This is just a preview. No files can be uploaded.'));
    } else {
      showErrorToast(response);
    }
  });

  uppy.on('restriction-failed', (file, error) => {
    dispatch(addImage({}));
    if (standalone) {
      showErrorToast(t('This is just a preview. No files can be uploaded.'));
    } else {
      showErrorToast(error);
    }
  });

  return uppy;
};

export default configureUppy;
