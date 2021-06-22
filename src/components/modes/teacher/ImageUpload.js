import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { FileInput } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '../../../index.css';
import { postAppInstanceResource } from '../../../actions';
import configureUppy from '../../../utils/uppy';
import { MAX_FILE_SIZE } from '../../../config/settings';

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
    marginBottom: theme.spacing(2),
  },
  typographyContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerText: {
    fontSize: '1.1vw',
  },
  captionText: {
    fontSize: '0.8vw',
    color: '#383838',
  },
}));

const ImageUpload = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { offline, standalone, spaceId, userId, appInstanceId } = useSelector(
    ({ context }) => context,
  );
  const imageToBeUploaded = useSelector(({ uppy }) => uppy.addedImage);

  const uppyInstance = configureUppy({
    t,
    offline,
    standalone,
    spaceId,
    userId,
    appInstanceId,
    postAppInstanceResource,
  });

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
        <FileInput
          uppy={uppyInstance}
          locale={{
            strings: {
              chooseFiles: t('Browse Your Computer'),
            },
          }}
        />
      </div>
      {imageToBeUploaded.name && (
        <Typography variant="caption" className={classes.uploadingText}>
          {t(`Uploading ${imageToBeUploaded.name}...`)}
        </Typography>
      )}
    </div>
  );
};

export default ImageUpload;
