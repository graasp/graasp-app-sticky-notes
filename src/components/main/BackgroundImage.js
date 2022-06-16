/* eslint-disable no-unused-vars */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Image } from 'react-konva';
import { useImage } from 'react-konva-utils';
import { APP_SETTINGS } from '../../constants/constants';
import { useAppSettingFile, useAppSettings } from '../context/appData';

// const useStyles = makeStyles(() => ({
//   image: {
//     width: '100%',
//     height: '100%',
//     display: 'block',
//     backgroundSize: '100% 100%',
//   },
// }));

const BackgroundImage = ({ x, y }) => {
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

  const [image] = useImage(url);
  // const [image] = useImage('https://konvajs.org/assets/yoda.jpg');

  // const LionImage = () => {
  //   const [image] = useImage('https://konvajs.org/assets/lion.png');
  //   return <Image image={image} />;
  // };

  return (
    <Image
      x={x - (image?.width ?? 0) / 2}
      y={y - (image?.height ?? 0) / 2}
      image={image}
    />
  );
};

BackgroundImage.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default BackgroundImage;
