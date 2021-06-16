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
            width: '1vw',
            height: '1vw',
            background:
              currentNoteColor === color
                ? AVAILABLE_COLORS_DARKER_SHADES[index]
                : color,
            borderRadius: '50%',
            border: currentNoteColor === color ? '1px dashed grey' : null,
          }}
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
