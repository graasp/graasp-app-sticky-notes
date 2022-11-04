import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Context, TokenContext } from '@graasp/apps-query-client';
import { Button, Loader } from '@graasp/ui';

import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import '@uppy/core/dist/style.css';
import { FileInput } from '@uppy/react';

import { MUTATION_KEYS, hooks, useMutation } from '../../../config/queryClient';
import { MAX_FILE_SIZE } from '../../../config/settings';
import { APP_SETTINGS } from '../../../constants/constants';
import '../../../index.css';
import configureUppy from '../../../utils/uppy';

const ImageUploadContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: 2,
  marginBottom: 1,
}));

const CloseButton = styled(Button)(() => ({
  width: '20%',
}));

const ImageUpload = () => {
  const { t } = useTranslation();
  const [uppy, setUppy] = useState(null);
  const context = useContext(Context);
  const token = useContext(TokenContext);
  const itemId = context?.get('itemId');
  const { mutate: deleteAppSetting } = useMutation(
    MUTATION_KEYS.DELETE_APP_SETTING,
  );
  const { mutate: onFileUploadComplete } = useMutation(
    MUTATION_KEYS.APP_SETTING_FILE_UPLOAD,
  );

  // current background
  const { data: appSettings } = hooks.useAppSettings();
  const backgroundSetting = appSettings?.find(
    ({ name }) => name === APP_SETTINGS.BACKGROUND,
  );

  useEffect(() => {
    setUppy(
      configureUppy({
        t,
        offline: context?.get('offline'),
        standalone: context?.get('standalone'),
        itemId,
        apiHost: context?.get('apiHost'),
        token,
        onComplete: (result) => {
          onFileUploadComplete({
            id: itemId,
            data: result.successful
              ?.map(({ response }) => response?.body?.[0])
              .filter(Boolean),
          });
        },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  if (!uppy) {
    return <Loader />;
  }

  const deleteBackground = () => {
    deleteAppSetting({ id: backgroundSetting.id });
  };

  const renderInput = () => {
    // if image is already set, show delete button
    if (backgroundSetting) {
      return (
        <CloseButton
          variant="contained"
          color="secondary"
          onClick={deleteBackground}
        >
          {t('Delete Background')}
        </CloseButton>
      );
    }

    // render input
    return (
      <FileInput
        uppy={uppy}
        locale={{
          strings: {
            chooseFiles: t('Browse Your Computer'),
          },
        }}
      />
    );
  };

  return (
    <ImageUploadContainer>
      <Stack direction="column">
        <Typography sx={{ fontSize: '1.1em' }}>
          {t('Set Background Image')}
        </Typography>
        <Typography sx={{ color: '#383838' }}>
          {t('Permitted file types: .jpg, .jpeg, .png')}
        </Typography>
        <Typography sx={{ color: '#383838' }}>
          {t(`Max file size: ${MAX_FILE_SIZE / 1e6}mb`)}
        </Typography>
      </Stack>
      {renderInput()}
    </ImageUploadContainer>
  );
};

export default ImageUpload;
