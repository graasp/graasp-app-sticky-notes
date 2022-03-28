import React from 'react';
import { FileItem } from '@graasp/ui';
import { Map } from 'immutable';
import { makeStyles } from '@material-ui/core/styles';
import { APP_SETTINGS } from '../../constants/constants';
import { useAppSettingFile, useAppSettings } from '../context/appData';

const useStyles = makeStyles(() => ({
  image: { width: '100%', height: '100%', display: 'block' },
}));

const BackgroundImage = () => {
  const classes = useStyles();
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

  const item = Map(backgroundSetting?.data);

  if (backgroundSetting.data?.extra?.file) {
    return (
      <FileItem
        item={item}
        content={backgroundImage}
        className={classes.image}
      />
    );
  }

  console.error('file type is not recognised');

  return null;
};

export default BackgroundImage;
