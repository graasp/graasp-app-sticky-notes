import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material';
import { Slider, Typography } from '@mui/material';

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

const CanvasScaleControl = ({ canvasScale, setCanvasScale }) => {
  const { t } = useTranslation();

  const getAriaLabel = (val) => `${100 * val}%`;

  const handleChange = (event, value) => {
    setCanvasScale(value);
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

CanvasScaleControl.propTypes = {
  canvasScale: PropTypes.number.isRequired,
  setCanvasScale: PropTypes.func.isRequired,
};

export default CanvasScaleControl;
