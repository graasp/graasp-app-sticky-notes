import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { FileInput } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '../../../index.css';
import { Loader, Button } from '@graasp/ui';
import { Context } from '../../context/ContextContext';
import configureUppy from '../../../utils/uppy';
import { MAX_FILE_SIZE } from '../../../config/settings';
import { TokenContext } from '../../context/TokenContext';
import { MUTATION_KEYS, useMutation } from '../../../config/queryClient';
import { useAppSettings } from '../../context/appData';
import { APP_SETTINGS } from '../../../constants/constants';

const useStyles = makeStyles((theme) => ({
  '@keyframes blinker': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  uploadingText: {
    animation: '$blinker',
    animationDuration: '2s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    fontSize: '0.9vw',
  },
  imageUploadContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  typographyContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerText: {
    fontSize: '1.05vw',
  },
  captionText: {
    fontSize: '0.8vw',
    color: '#383838',
  },
}));

const ImageUpload = () => {
  const { t } = useTranslation();
  const classes = useStyles();
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
  const { data: appSettings } = useAppSettings();
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
        <Button
          variant="contained"
          color="secondary"
          onClick={deleteBackground}
          className={classes.closeButton}
        >
          {t('Delete Background')}
        </Button>
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
    <div>
      <div className={classes.imageUploadContainer}>
        <div className={classes.typographyContainer}>
          <Typography className={classes.headerText}>
            {t('Set Background Image')}
          </Typography>
          <Typography className={classes.captionText}>
            {t('Permitted file types: .jpg, .jpeg, .png')}
          </Typography>
          <Typography className={classes.captionText}>
            {t(`Max file size: ${MAX_FILE_SIZE / 1e6}mb`)}
          </Typography>
        </div>
        {renderInput()}
      </div>
    </div>
  );
};

export default ImageUpload;
