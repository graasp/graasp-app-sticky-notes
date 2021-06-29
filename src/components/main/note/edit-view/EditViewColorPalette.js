import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AVAILABLE_COLORS,
  AVAILABLE_COLORS_DARKER_SHADES,
} from '../../../../constants/constants';
import { editNoteColor } from '../../../../actions';

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

const EditViewColorPalette = ({ height }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { color: noteColor } = useSelector(
    ({ canvas }) => canvas.noteBeingEdited.data,
  );

  return (
    <div className={classes.paletteContainer} style={{ height }}>
      {AVAILABLE_COLORS.map((color, index) => (
        <div
          style={{
            background:
              noteColor === color
                ? AVAILABLE_COLORS_DARKER_SHADES[index]
                : color,
            border: noteColor === color ? '1px dashed grey' : null,
          }}
          className={classes.color}
          onClick={() => {
            dispatch(editNoteColor(color));
          }}
          key={color}
        />
      ))}
    </div>
  );
};

EditViewColorPalette.propTypes = {
  height: PropTypes.string.isRequired,
};

export default EditViewColorPalette;
