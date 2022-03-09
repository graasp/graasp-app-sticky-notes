import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { FileInput } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '../../../index.css';
import configureUppy from '../../../utils/uppy';
import { MAX_FILE_SIZE } from '../../../config/settings';
import { Context } from '../../context/ContextContext';

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
  const { apiHost, itemId, token, settings } = useContext(Context);
  /* eslint-disable-next-line no-unused-vars */
  const currentImageUri = settings?.backgroundImage?.uri;
  // const imageToBeUploaded = useSelector(({ uppy }) => uppy.addedImage);

    /*
    {
    t,
    offline,
    standalone,
    spaceId,
    userId,
    appInstanceId,
    patchAppInstance,
    currentImageUri,
  }
    */
  const handleComplete = () => {
    console.log("Upload complete.");
  }

  const handleProgress = () => {
    console.log("Upload progressing");
  }

  const handleFileAdded = () => {
    console.log("Upload complete.");
  }

  const handleError = () => {
    console.log("Upload complete.");
  }

  const handleUpload = () => {
    console.log("Upload complete.");
  }

  const uppyInstance = configureUppy({
    apiHost,
    itemId,
    token,
    onComplete: handleComplete,
    onProgress: handleProgress,
    onFileAdded: handleFileAdded,
    onError: handleError,
    onUpload: handleUpload,
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
      {/* imageToBeUploaded.name && (
        <Typography variant="caption" className={classes.uploadingText}>
          {t(`Uploading ${imageToBeUploaded.name}...`)}
        </Typography>
      ) */}
    </div>
  );
};

export default ImageUpload;
