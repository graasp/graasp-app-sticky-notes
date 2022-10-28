import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import { APP_SETTINGS } from '../../constants/constants';
import { hooks } from '../../config/queryClient';
import {
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_BACKGROUND_SCALE,
} from '../../config/settings';
import { BACKGROUND_IMAGE_CY } from '../../config/selectors';

const Container = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0px',
  left: '0px',
}));

const BackgroundImage = () => {
  const { data: appSettings, isSuccess } = hooks.useAppSettings();
  const [scale, setScale] = useState(1.0);
  const [enabled, setEnabled] = useState();
  const [backgroundSetting, setBackgroundSetting] = useState({});

  useEffect(() => {
    if (isSuccess) {
      setBackgroundSetting(
        appSettings?.find(({ name }) => name === APP_SETTINGS.BACKGROUND),
      );
      const backgroundSettings = appSettings?.find(
        ({ name }) => name === APP_SETTINGS.BACKGROUND_SETTINGS,
      );
      const scaleTmp =
        backgroundSettings?.data?.scale || DEFAULT_BACKGROUND_SCALE;
      const enabledTmp =
        backgroundSettings?.data?.toggle ?? DEFAULT_BACKGROUND_ENABLED;
      setScale(scaleTmp);
      setEnabled(enabledTmp);
    }
  }, [appSettings, isSuccess, backgroundSetting]);

  console.debug('backgroundSetting:', backgroundSetting);
  console.debug(
    Boolean(
      backgroundSetting?.data?.extra?.file ||
        backgroundSetting?.data?.extra?.s3File,
    ),
  );
  const { data: backgroundImage } = hooks.useAppSettingFile(
    { appSettingId: backgroundSetting?.id },
    Boolean(
      backgroundSetting?.data?.extra?.file ||
        backgroundSetting?.data?.extra?.s3File,
    ),
  );

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
    <Container>
      <img
        data-cy={BACKGROUND_IMAGE_CY}
        alt="background"
        src={url}
        style={{ transform: `scale(${scale}, ${scale})` }}
      />
    </Container>
  );
};

export default BackgroundImage;
