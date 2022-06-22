/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Image as ImageK } from 'react-konva';
import { APP_SETTINGS } from '../../constants/constants';
import { useAppSettingFile, useAppSettings } from '../context/appData';

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

//   const [blob, setBlob] = useState(null);

//   const fileUrl = 'https://picsum.photos/200/300';

//   useEffect(() => {
//   const xhr = new XMLHttpRequest();
//   xhr.responseType = 'blob';
//   xhr.onload = () => {
//     setBlob(xhr.response); // xhr.response is a blob
//   };
//   xhr.open('GET', fileUrl);
//   xhr.send();
// }, []);

  const image = new Image();

  useEffect(() => {
    if (backgroundImage) {
      const url = URL.createObjectURL(backgroundImage);
      image.src = url;
    }
  }, [backgroundImage]);

  // const [image, setImage] = useState(null);

  // useEffect(() => {
  //   if(backgroundImage) {
  //     const url = URL.createObjectURL(backgroundImage);
  //     const [imageTmp] = useImage(url);
  //     setImage(imageTmp);
  //   }
  // }, [backgroundImage]);

  if (!backgroundSetting || !backgroundImage || !image) {
    return null;
  }

  return (
    <ImageK
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
