import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import EditViewTextFields from './EditViewTextFields';
import EditViewColorPalette from './EditViewColorPalette';
import EditViewActions from './EditViewActions';
import { useMutation, MUTATION_KEYS } from '../../../../config/queryClient';
import CanvasContext from '../../../context/CanvasContext';

const useStyles = makeStyles(() => ({
  form: {
    width: '17.5%',
    height: '25%',
    position: 'absolute',
    boxShadow: '5px 5px 7px rgba(33,33,33,.7)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'default',
  },
}));

const NoteEditView = ({ note, id }) => {
  const classes = useStyles();

  // destructure note properties
  const { windowDimensions, position } = note;
  const { innerHeight, innerWidth } = windowDimensions;
  const { pageX, pageY } = position;
  let { title, description } = note;
  const [color, setColor] = useState(note.color);

  const [,setNoteBeingEditedId] = useContext(CanvasContext);

  const handleChangeText = (newTitle, newDescription) => {
    description = newDescription;
    title = newTitle;
  }

  const handleChangeColor = (newColor) => {
    setColor(newColor);
  }

  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);

  const handleCancel = () => {
    setNoteBeingEditedId(null);
  };

  const handleConfirm = () => {
    const updatedNote = {
      ...note,
      title,
      description,
      color,
    };

    patchAppData({
      data: updatedNote,
      id,
    });

    setNoteBeingEditedId(null);
  };

  // const { color } = useSelector(({ canvas }) => canvas.noteBeingEdited.data);

  return (
    <>
      { /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={classes.form}
        onClick={(event) => event.stopPropagation()}
        style={{
          top: `${(pageY / innerHeight) * 100}%`,
          left: `${(pageX / innerWidth) * 100}%`,
          background: color,
        }}
      >
        <EditViewTextFields height="65%" title={title} description={description} onChange={handleChangeText} />
        <EditViewColorPalette height="20%" color={color} onChange={handleChangeColor} />
        <EditViewActions height="15%" note={note} id={id} onConfirm={handleConfirm} onCancel={handleCancel} />
      </div>
    </>
  );
};

NoteEditView.propTypes = {
  note: PropTypes.shape({
    windowDimensions: PropTypes.shape({
      innerHeight: PropTypes.number.isRequired,
      innerWidth: PropTypes.number.isRequired,
    }),
    position: PropTypes.shape({
      pageX: PropTypes.number.isRequired,
      pageY: PropTypes.number.isRequired,
    }),
    color: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    rotation: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default NoteEditView;
