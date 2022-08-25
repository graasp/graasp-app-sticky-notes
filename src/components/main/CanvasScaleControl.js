import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Slider, Typography } from '@material-ui/core';
import { ZOOM_MAX, ZOOM_MIN, ZOOM_STEP } from '../../config/settings';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '20%',
    width: '20%',
    maxHeight: '20%',
  },
  sliderStyle: {
    width: '80%',
  },
}));

const CanvasScaleControl = ({ canvasScale, setCanvasScale }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const getAriaLabel = (val) => `${100 * val}%`;

  const handleChange = (event, value) => {
    setCanvasScale(value);
  };
  return (
    <div className={classes.mainContainer}>
      <Typography>{t('Zoom')}</Typography>
      <Slider
        className={classes.sliderStyle}
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
    </div>
  );
};

CanvasScaleControl.propTypes = {
  canvasScale: PropTypes.number.isRequired,
  setCanvasScale: PropTypes.func.isRequired,
};

export default CanvasScaleControl;
