import React from 'react';
import { PropTypes } from 'prop-types';
// import { useTranslation } from 'react-i18next';
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

const BackgroundImage = ({ children }) => {
  const classes = useStyles();
  // const { t } = useTranslation();
  const { data: appSettings } = useAppSettings();
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

  if (!backgroundSetting || !backgroundImage) {
    return null;
  }

  const url = URL.createObjectURL(backgroundImage);

  return (
    <div
      className={classes.image}
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      {children}
    </div>
  );
};

BackgroundImage.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

BackgroundImage.defaultProps = {
  children: null,
};

export default BackgroundImage;
