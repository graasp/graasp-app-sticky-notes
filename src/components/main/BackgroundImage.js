import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { APP_SETTINGS } from '../../constants/constants';
import { useAppSettingFile, useAppSettings } from '../context/appData';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
    height: '100%',
    display: 'block',
    backgroundSize: '100% 100%',
  },
}));

const BackgroundImage = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { data: appSettings } = useAppSettings();
  const backgroundSetting = appSettings?.find(
    ({ name }) => name === APP_SETTINGS.BACKGROUND,
  );
  const { data: backgroundImage } = useAppSettingFile(
    backgroundSetting?.id,
    Boolean(backgroundSetting),
  );

  if (!backgroundSetting || !backgroundImage) {
    return null;
  }

  const url = URL.createObjectURL(backgroundImage);

  // const item = Map(backgroundSetting?.data);

  if (backgroundSetting.data?.extra?.file) {
    return (
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${url})`,
        }}
      />
    );
  }
  /* eslint-disable-next-line no-console */
  console.error(t('File type is not recognised.'));

  return null;
};

export default BackgroundImage;
