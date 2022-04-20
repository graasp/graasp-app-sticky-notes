import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import EditViewTextFields from './EditViewTextFields';
import { useMutation, MUTATION_KEYS } from '../../../../config/queryClient';
import { CanvasContext } from '../../../context/CanvasContext';
import { ACTION_TYPES } from '../../../../config/actionTypes';

const useStyles = makeStyles(() => ({
  form: {
    maxWidth: '15%',
    position: 'relative',
    boxShadow: '5px 5px 7px rgba(33,33,33,.7)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'default',
    borderRadius: '0.5em',
  },
  highlight: { // TODO: Change this style and implement the animation
    animation: 'glow 800ms ease-out 6 alternate',
	  background: 'linear-gradient(#333933, #222922)',
	  borderColor: '#f44336',
	  boxShadow: '5px 5px 7px rgba(255,0,0,.1)',
	  color: '#efe',
	  outline: 'none',
  },
}));

const NoteEditView = ({ note, id }) => {
  const classes = useStyles();

  // destructure note properties
  const { position } = note;
  const { pageX, pageY } = position;
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [color, setColor] = useState(note.color);

  const { setNoteBeingEditedId, userSetColor, highlightNoteBeingEdited, setHighlightNoteBeingEdited } = useContext(CanvasContext);

  useEffect(() => {
    setColor(userSetColor);
  }, [userSetColor]);

  const handleChangeText = (newTitle, newDescription) => {
    setDescription(newDescription);
    setTitle(newTitle);
  };

  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const saveNote = () => {
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
    postAction({
      type: ACTION_TYPES.EDIT,
      data: {
        note: updatedNote,
        id,
      },
    });
  };

  const handleConfirm = () => {
    saveNote();
    setNoteBeingEditedId(null);
    setHighlightNoteBeingEdited(false);
  };

  console.log("Highlight? ", highlightNoteBeingEdited);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={clsx(classes.form, (highlightNoteBeingEdited && classes.highlight))}
        style={{
          top: `${pageY}px`,
          left: `${pageX}px`,
          background: color,
        }}
      >
        <EditViewTextFields
          height="65%"
          title={title}
          description={description}
          onChange={handleChangeText}
          onConfirm={handleConfirm}
        />
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
