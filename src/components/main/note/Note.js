import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NoteFinalView from './final-view/NoteFinalView';
import NoteEditView from './edit-view/NoteEditView';
import { CanvasContext } from '../../context/CanvasContext';
import { DEFAULT_ANONYMOUS_USERNAME } from '../../../config/settings';

const Note = ({ note, id, userName, newPageX, newPageY }) => {
  const { noteBeingEditedId } = useContext(CanvasContext);

  return noteBeingEditedId === id ? (
    <NoteEditView note={note} id={id} />
  ) : (
    <NoteFinalView
      note={note}
      id={id}
      userName={userName}
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
    color: PropTypes.string,
    title: PropTypes.string,
    rotation: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  userName: PropTypes.string,
  newPageX: PropTypes.number,
  newPageY: PropTypes.number,
};

Note.defaultProps = {
  userName: DEFAULT_ANONYMOUS_USERNAME,
  newPageX: null,
  newPageY: null,
};

export default Note;
