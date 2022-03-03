import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AVAILABLE_COLORS,
  AVAILABLE_COLORS_DARKER_SHADES,
} from '../../../../constants/constants';
// import { editNoteColor } from '../../../../actions';

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

const EditViewColorPalette = ({ height, color, onChange }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  /* const { color: noteColor } = useSelector(
    ({ canvas }) => canvas.noteBeingEdited.data,
  ); */

  const [noteColor, setNoteColor] = useState(color);

  return (
    <div className={classes.paletteContainer} style={{ height }}>
      {AVAILABLE_COLORS.map((colorItem, index) => (
        <>
          { /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            style={{
              background:
                noteColor === colorItem
                  ? AVAILABLE_COLORS_DARKER_SHADES[index]
                  : colorItem,
              border: noteColor === colorItem ? '1px dashed grey' : null,
            }}
            className={classes.color}
            onClick={() => {
              setNoteColor(colorItem);
              onChange(colorItem);
            }}
            key={colorItem}
          />
        </>
      ))}
    </div>
  );
};

EditViewColorPalette.propTypes = {
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditViewColorPalette;
