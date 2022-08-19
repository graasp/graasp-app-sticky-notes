import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import { CanvasContext } from '../../context/CanvasContext';
import { DEFAULT_ANONYMOUS_USERNAME } from '../../../config/settings';
import { useMutation, MUTATION_KEYS } from '../../../config/queryClient';
import { ACTION_TYPES } from '../../../config/actionTypes';
import {
  DEFAULT_NOTE_COLOR,
} from '../../../constants/constants';
import EditableText from './EditableText';

const useStyles = makeStyles(() => ({
  note: {
    overflow: 'auto',
    border: 'none',
    maxWidth: '30em',
    padding: '0.7em 0.8em',
    boxShadow: '3px 3px 4px rgba(33,33,33,.7)',
    cursor: 'move',
    width: 'auto',
    height: 'fit-content',
    position: 'absolute',
  },
  selected: {
    border: '1px solid dodgerblue',
  },
}));

const Note = ({ note, id, userName, scale }) => {
  const {
    userSetColor,
    noteBeingEditedId,
    setNoteBeingEditedId,
    noteBeingTransformedId,
    setNoteBeingTransformedId,
  } = useContext(CanvasContext);

  const { position, color } = note;

  const { pageX = 0, pageY = 0 } = position;
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const [text, setText] = useState(note?.text);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const classes = useStyles();
  const textRef = useRef(null);
  const backgroundNoteRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (noteBeingTransformedId === id && !isTransforming) {
      setIsTransforming(true);
    } else if (noteBeingTransformedId !== id) {
      setIsTransforming(false);
    }
  }, [noteBeingTransformedId]);

  const patchNote = (updatedNote, actionType) => {
    const patch = {
      data: updatedNote,
      id,
    };
    patchAppData(patch);
    postAction({
      type: actionType,
      data: {
        ...updatedNote,
        id,
      },
    });
  };

  useEffect(() => {
    if (noteBeingTransformedId === id) {
      const updatedNote = {
        ...note,
        color: userSetColor,
      };

      patchNote(updatedNote, ACTION_TYPES.EDIT);
    }
  }, [userSetColor]);

  // eslint-disable-next-line no-unused-vars
  const eventControl = (event, data) => {
    if (event.type === 'mousemove' || event.type === 'touchmove') {
      setIsDragging(true);
    }
    if (event.type === 'mouseup' || event.type === 'touchend') {
      setTimeout(() => {
        setIsDragging(false);
      }, 100);
    }
  };

  const handleDragEnd = (event, data) => {
    eventControl(event, data);
    const { x, y } = data;
    const updatedNote = {
      ...note,
      position: {
        pageX: x,
        pageY: y,
      },
    };

    patchNote(updatedNote, ACTION_TYPES.MOVE);
  };

  const toggleEdit = () => {
    if (isEditing) {
      setNoteBeingEditedId(null);
      setIsEditing(false);
      const updatedNote = {
        ...note,
        text,
      };
      patchNote(updatedNote, ACTION_TYPES.EDIT);
    } else {
      setNoteBeingEditedId(id);
      setIsEditing(true);
    }
  };

  useEffect(() => {
    if (noteBeingEditedId === id && !isEditing) {
      setIsEditing(true);
    } else if (noteBeingEditedId !== id && isEditing) {
      toggleEdit();
    }
  }, [noteBeingEditedId]);

  const toggleTransform = () => {
    if (isTransforming) {
      setNoteBeingTransformedId(null);
      setIsTransforming(false);
    } else {
      setNoteBeingTransformedId(id);
      setIsTransforming(true);
    }
  };

  const handleTextEdit = (newText) => {
    setText(newText);
  };

  const transformerRef = useRef(null);

  useEffect(() => {
    if (isTransforming && transformerRef.current !== null) {
      transformerRef.current.nodes([backgroundNoteRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isTransforming]);

  const handleClickEvent = (e) => {
    e.stopPropagation();
    if(isDragging){
      return;
    }
    if(e.detail === 2 && !isEditing){
      toggleEdit();
    } else {
      toggleTransform();
    }
  };

  return (
    <Draggable
      defaultPosition={{ x: pageX, y: pageY }}
      disabled={isEditing}
      onStart={(e) => {
        e.stopPropagation();
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onDrag={eventControl}
      onStop={handleDragEnd}
      scale={scale}
      >
      { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={classNames(classes.note, isTransforming && classes.selected )}
        style={{
          backgroundColor: color,
        }}
        onClick={handleClickEvent}
      >
        <EditableText
          text={text}
          isEditing={isEditing}
          onToggleEdit={toggleEdit}
          onToggleTransform={toggleTransform}
          onChange={handleTextEdit}
          ref={textRef}
        />
        {!isEditing && <Typography>{`Added by ${userName}`}</Typography>}
      </div>
    </Draggable>
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
    size: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
    }),
    color: PropTypes.string,
    text: PropTypes.string,
    rotation: PropTypes.number.isRequired,
  }),
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  userName: PropTypes.string,
  scale: PropTypes.number,
};

Note.defaultProps = {
  userName: DEFAULT_ANONYMOUS_USERNAME,
  note: {
    color: DEFAULT_NOTE_COLOR,
    size: {
      height: 40,
      width: 40,
    },
  },
  scale: 1,
};

export default Note;
