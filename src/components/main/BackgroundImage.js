import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { APP_SETTINGS } from '../../constants/constants';
import { useAppSettingFile, useAppSettings } from '../context/appData';
import {
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_BACKGROUND_SCALE,
} from '../../config/settings';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px',
  },
}));

const BackgroundImage = () => {
  const classes = useStyles();
  const { data: appSettings, isSuccess } = useAppSettings();
  const [scale, setScale] = useState();
  const [enabled, setEnabled] = useState();

  const backgroundSetting = appSettings?.find(
    ({ name }) => name === APP_SETTINGS.BACKGROUND,
  );
  const { data: backgroundImage } = useAppSettingFile(
    backgroundSetting?.id,
    Boolean(
      backgroundSetting?.data?.extra?.file ||
        backgroundSetting?.data?.extra?.s3File,
    ),
  );

  useEffect(() => {
    if (isSuccess) {
      const backgroundSettings = appSettings?.find(
        ({ name }) => name === APP_SETTINGS.BACKGROUND_SETTINGS,
      );
      const scaleTmp =
        backgroundSettings?.data?.scale || DEFAULT_BACKGROUND_SCALE;
      const enabledTmp =
        backgroundSetting?.data?.toggle || DEFAULT_BACKGROUND_ENABLED;
      setScale(scaleTmp);
      setEnabled(enabledTmp);
    }
  }, [appSettings, isSuccess]);

  const imageRef = useRef();
  const [url, setUrl] = useState();

  useEffect(() => {
    if (backgroundImage) {
      setUrl(URL.createObjectURL(backgroundImage));
    }
  }, [backgroundImage]);

  if (!backgroundSetting || !backgroundImage || !enabled) {
    return null;
  }
  return (
    <div className={classes.container}>
      <img
        alt="background"
        ref={imageRef}
        src={url}
        style={{ transform: `scale(${scale}, ${scale})` }}
      />
    </div>
  );
};

export default BackgroundImage;
