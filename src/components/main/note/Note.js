import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Transition } from 'react-transition-group';
import { CanvasContext } from '../../context/CanvasContext';
import { DEFAULT_ANONYMOUS_USERNAME } from '../../../config/settings';
import { useMutation, MUTATION_KEYS } from '../../../config/queryClient';
import { ACTION_TYPES } from '../../../config/actionTypes';
import { DEFAULT_NOTE_COLOR } from '../../../constants/constants';
import EditableText from './EditableText';

const animationDuration = 300;

const useStyles = makeStyles(() => ({
  note: {
    overflow: 'visible',
    border: '1px solid',
    borderColor: 'rgba(255, 255, 255, 0)',
    maxWidth: '30em',
    padding: '0.7em 0.8em',
    boxShadow: '3px 3px 4px rgba(33,33,33,.7)',
    cursor: 'move',
    height: 'fit-content',
    position: 'absolute',
    transition: `min-width ${animationDuration}ms ease-in-out, min-height ${animationDuration}ms ease-in-out`,
    // zIndex: '0',
    '&-entering': { minWidth: '30em', minHeight: '10em', zIndex: '1' },
    '&-entered': { minWidth: '30em', minHeight: '10em', zIndex: '1' },
    '&-exiting': { minWwidth: '0em', minHeight: '0em' },
    '&-exited': { minWidth: '0em', minHeight: '0em' },
  },
  selected: {
    borderColor: 'dodgerblue',
  },
  userInfo: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '10px',
    color: 'darkgrey',
    textAlign: 'right',
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
  const { t } = useTranslation();

  const { pageX = 0, pageY = 0 } = position;
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const [text, setText] = useState(note?.text);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isFixedSize, setIsFixedSize] = useState(false);

  const classes = useStyles();
  const textRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (noteBeingTransformedId === id && !isTransforming) {
      setIsTransforming(true);
    } else if (noteBeingTransformedId !== id) {
      setIsTransforming(false);
    }
  }, [noteBeingTransformedId, id, isTransforming]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSetColor]);

  // eslint-disable-next-line no-unused-vars
  const eventControl = (event, data) => {
    if (event.type === 'mousemove' || event.type === 'touchmove') {
      setIsDragging(true);
    }
    if (event.type === 'mouseup' || event.type === 'touchend') {
      setIsDragging(false);
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
      setIsFixedSize(false);
      const updatedNote = {
        ...note,
        text,
      };
      patchNote(updatedNote, ACTION_TYPES.EDIT);
    } else {
      setNoteBeingEditedId(id);
      setIsEditing(true);
      setIsFixedSize(true);
    }
  };

  useEffect(() => {
    if (noteBeingEditedId === id && !isEditing) {
      setIsEditing(true);
      setIsFixedSize(true);
    } else if (noteBeingEditedId !== id && isEditing) {
      toggleEdit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleClickEvent = (e) => {
    e.stopPropagation();
    if (isDragging) {
      return;
    }
    if (e.detail === 2 && !isEditing) {
      toggleEdit();
    } else {
      toggleTransform();
    }
  };

  return (
    <Transition in={isFixedSize} timeout={animationDuration}>
      {(state) => (
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
          {/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            className={classNames(
              classes.note,
              isTransforming && classes.selected,
              `${classes.note}-${state}`,
            )}
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
            {!isEditing && (
              <p className={classes.userInfo}>{`${t(
                'Added by',
              )} ${userName}`}</p>
            )}
          </div>
        </Draggable>
      )}
    </Transition>
  );
};

Note.propTypes = {
  note: PropTypes.shape({
    position: PropTypes.shape({
      pageX: PropTypes.number.isRequired,
      pageY: PropTypes.number.isRequired,
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
  },
  scale: 1,
};

export default Note;
