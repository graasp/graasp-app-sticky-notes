import { t } from 'i18next';

import React, { FC, useEffect, useState } from 'react';

import { styled } from '@mui/material';

import {
  APP_SETTINGS_TYPES,
  BackgroundSettingsType,
  BackgroundType,
} from '../../config/appSettingTypes';
import { hooks } from '../../config/queryClient';
import { BACKGROUND_IMAGE_CY } from '../../config/selectors';
import { DEFAULT_BACKGROUND_ENABLED } from '../../config/settings';
import { useAppSettingContext } from '../context/AppSettingContext';

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

const BackgroundImage: FC = () => {
  const { appSettingArray: appSettings } = useAppSettingContext();
  const [enabled, setEnabled] = useState(DEFAULT_BACKGROUND_ENABLED);
  const [backgroundSetting, setBackgroundSetting] = useState<BackgroundType>();

  useEffect(() => {
    setBackgroundSetting(
      appSettings?.find(({ name }) => name === APP_SETTINGS_TYPES.BACKGROUND),
    );
    const backgroundSettings = appSettings?.find(
      ({ name }) => name === APP_SETTINGS_TYPES.BACKGROUND_SETTINGS,
    ) as BackgroundSettingsType;
    const enabledTmp =
      backgroundSettings?.data?.toggle ?? DEFAULT_BACKGROUND_ENABLED;
    setEnabled(enabledTmp);
  }, [appSettings, backgroundSetting]);

  const [url, setUrl] = useState<string>('');

  const { data: backgroundImage } = hooks.useAppSettingFile(
    { appSettingId: backgroundSetting?.id || '' },
    {
      enabled: Boolean(
        backgroundSetting?.data?.extra?.file ||
          backgroundSetting?.data?.extra?.s3File,
      ),
    },
  );

  useEffect(() => {
    if (backgroundImage) {
      setUrl(URL.createObjectURL(backgroundImage));
    } else {
      setUrl('');
    }
  }, [backgroundImage]);

  if (!backgroundSetting || url?.length === 0 || !enabled) {
    return <Container />;
  }
  return (
    <Container>
      <img data-cy={BACKGROUND_IMAGE_CY} alt={t('Background')} src={url} />
    </Container>
  );
};

export default BackgroundImage;
