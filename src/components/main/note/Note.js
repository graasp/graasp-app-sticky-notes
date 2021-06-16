/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import NoteHeader from './NoteHeader';
import NoteDescription from './NoteDescription';
import NoteFooter from './NoteFooter';

const useStyles = makeStyles(() => ({
  noteContainer: {
    width: '15%',
    height: '20%',
    position: 'absolute',
    padding: '1%',
    boxShadow: '5px 5px 7px rgba(33,33,33,.7)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'default',
  },
}));

const Note = ({ note }) => {
  const {
    windowDimensions,
    position,
    color,
    title,
    description,
    rotation,
    id,
  } = note;
  const { innerHeight, innerWidth } = windowDimensions;
  const { pageX, pageY } = position;
  const classes = useStyles();
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={classes.noteContainer}
      onClick={(event) => event.stopPropagation()}
      onMouseOver={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      style={{
        top: `${(pageY / innerHeight) * 100}%`,
        left: `${(pageX / innerWidth) * 100}%`,
        background: color,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <NoteHeader title={title} showActions={showActions} id={id} />
      <NoteDescription description={description} />
      <NoteFooter />
    </div>
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    rotation: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Note;
