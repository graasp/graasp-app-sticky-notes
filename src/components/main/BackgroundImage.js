import React from 'react';
import { PropTypes } from 'prop-types';
import { Image } from 'react-konva';
import { useImage } from 'react-konva-utils';
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

  let image;

  if(backgroundImage){
    const url = URL.createObjectURL(backgroundImage);
    [image] = useImage(url);
  }

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
