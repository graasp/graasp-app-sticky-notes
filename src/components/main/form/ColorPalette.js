import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  AVAILABLE_COLORS,
  AVAILABLE_COLORS_DARKER_SHADES,
} from '../../../constants/constants';
import { setActiveForm } from '../../../actions';

const useStyles = makeStyles(() => ({
  paletteContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  color: {
    width: '1vw',
    height: '1vw',
    cursor: 'pointer',
    borderRadius: '50%',
  },
}));

const ColorPalette = ({ height }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeForm = useSelector(({ canvas }) => canvas.activeForm);
  const { color: currentNoteColor } = activeForm;

  return (
    <div className={classes.paletteContainer} style={{ height }}>
      {AVAILABLE_COLORS.map((color, index) => (
        <div
          style={{
            background:
              currentNoteColor === color
                ? AVAILABLE_COLORS_DARKER_SHADES[index]
                : color,
            border: currentNoteColor === color ? '1px dashed grey' : null,
          }}
          className={classes.color}
          onClick={() => {
            dispatch(setActiveForm({ ...activeForm, color }));
          }}
          key={color}
        />
      ))}
    </div>
  );
};

ColorPalette.propTypes = {
  height: PropTypes.string.isRequired,
};

export default ColorPalette;
