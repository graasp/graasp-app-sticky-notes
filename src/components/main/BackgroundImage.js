/* eslint-disable no-unused-vars */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Image as ImageK } from 'react-konva';
import { APP_SETTINGS } from '../../constants/constants';
import { useAppSettingFile, useAppSettings } from '../context/appData';
import CANVAS_DIMENSIONS, {
  CANVAS_DIMENSIONS_PROP,
} from '../../constants/canvas_dimensions';
import {
  DEFAULT_CANVAS_DIMENSIONS,
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_BACKGROUND_SCALE,
} from '../../config/settings';

const DEFAULT_BACKGROUND_SETTINGS = {
  name: APP_SETTINGS.BACKGROUND_SETTINGS,
  data: {
    toggle: DEFAULT_BACKGROUND_ENABLED,
    scale: DEFAULT_BACKGROUND_SCALE,
  },
};

const BackgroundImage = ({ x, y, canvasDimensions }) => {
  const [image] = useState(new Image());

  const { data: appSettings, isSuccess, isLoading } = useAppSettings();
  const [scale, setScale] = useState();

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
      const scaleTmp =
        appSettings?.find(
          ({ name }) => name === APP_SETTINGS.BACKGROUND_SETTINGS,
        )?.data?.scale || DEFAULT_BACKGROUND_SCALE;
      setScale(scaleTmp);
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

  if (!backgroundSetting || !backgroundImage) {
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
  canvasDimensions: CANVAS_DIMENSIONS_PROP,
};

BackgroundImage.defaultProps = {
  canvasDimensions: CANVAS_DIMENSIONS.get(DEFAULT_CANVAS_DIMENSIONS),
};

export default BackgroundImage;
