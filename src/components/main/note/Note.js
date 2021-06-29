import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import NoteFinalView from './final-view/NoteFinalView';
import NoteEditView from './edit-view/NoteEditView';

const Note = ({ note, id, userId }) => {
  const noteBeingEdited = useSelector(({ canvas }) => canvas.noteBeingEdited);

  return noteBeingEdited._id === id ? (
    <NoteEditView note={note} id={id} />
  ) : (
    <NoteFinalView note={note} id={id} userId={userId} />
  );
};

Note.propTypes = {
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
  id: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]).isRequired,
  userId: PropTypes.string,
};

Note.defaultProps = {
  userId: null,
};

export default Note;
