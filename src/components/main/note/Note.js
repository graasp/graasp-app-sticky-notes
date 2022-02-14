import React from 'react';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import NoteFinalView from './final-view/NoteFinalView';
import NoteEditView from './edit-view/NoteEditView';

/* eslint-disable-next-line arrow-body-style */
const Note = ({ note, id, userId, newPageX, newPageY }) => {
  // const noteBeingEdited = useSelector(({ canvas }) => canvas.noteBeingEdited);

  // return noteBeingEdited._id === id ? (
  /* eslint-disable-next-line no-self-compare */
  return id === id ? (  // TODO: Modify to implement edition
    <NoteEditView note={note} id={id} />
  ) : (
    <NoteFinalView
      note={note}
      id={id}
      userId={userId}
      newPageX={newPageX}
      newPageY={newPageY}
    />
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
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  userId: PropTypes.string,
  newPageX: PropTypes.number,
  newPageY: PropTypes.number,
};

Note.defaultProps = {
  userId: null,
  newPageX: null,
  newPageY: null,
};

export default Note;
