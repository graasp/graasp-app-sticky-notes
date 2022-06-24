import React, { useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Image as ImageK } from 'react-konva';
import { APP_SETTINGS } from '../../constants/constants';
import { useAppSettingFile, useAppSettings } from '../context/appData';
import {
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_BACKGROUND_SCALE,
} from '../../config/settings';

const BackgroundImage = ({ x, y }) => {
  const [image] = useState(new Image());

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

  // const [backgroundImage, setBlob] = useState(null);

  // const fileUrl = 'https://picsum.photos/5000/2000';

  // useEffect(() => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = 'blob';
  //   xhr.onload = () => {
  //     setBlob(xhr.response); // xhr.response is a blob
  //   };
  //   xhr.open('GET', fileUrl);
  //   xhr.send();
  //   image.style.width = canvasDimensions.width;
  // }, []);

  // const backgroundSetting = true;

  useEffect(() => {
    if (backgroundImage) {
      const url = URL.createObjectURL(backgroundImage);
      image.src = url;
    }
  }, [backgroundImage]);

  if (!backgroundSetting || !backgroundImage || !enabled) {
    return null;
  }
  return (
    <ImageK
      ref={imageRef}
      x={x - (scale * (image?.width ?? 0)) / 2}
      y={y - (scale * (image?.height ?? 0)) / 2}
      image={image}
      scaleX={scale}
      scaleY={scale}
    />
  );
};

BackgroundImage.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default BackgroundImage;
