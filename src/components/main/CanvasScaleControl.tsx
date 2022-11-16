import React from 'react';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { ZOOM_MAX, ZOOM_MIN, ZOOM_STEP } from '../../config/settings';

const MainContainer = styled('div')(() => ({
  position: 'fixed',
  bottom: 2,
  left: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '20%',
  width: '20%',
  maxHeight: '20%',
}));

interface CanvasScaleControlInterface {
  canvasScale: number;
  setCanvasScale: React.Dispatch<React.SetStateAction<number>>;
}

const CanvasScaleControl = (
  props: CanvasScaleControlInterface,
): JSX.Element => {
  const { canvasScale, setCanvasScale } = props;
  const { t } = useTranslation();

  const getAriaLabel = (val: number): string => `${100 * val}%`;

  const handleChange = (_event: Event, value: number | number[]): void => {
    if (typeof value === 'number') {
      setCanvasScale(value);
    } else {
      setCanvasScale(value[0]);
    }
  };
  return (
    <MainContainer>
      <Typography>{t('Zoom')}</Typography>
      <Slider
        sx={{ width: '80% ' }}
        getAriaLabel={getAriaLabel}
        defaultValue={1}
        value={canvasScale}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={ZOOM_STEP}
        marks
        min={ZOOM_MIN}
        max={ZOOM_MAX}
      />
    </MainContainer>
  );
};

export default CanvasScaleControl;
