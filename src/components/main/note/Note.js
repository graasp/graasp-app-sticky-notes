/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import { CanvasContext } from '../../context/CanvasContext';
import { DEFAULT_ANONYMOUS_USERNAME } from '../../../config/settings';
import { useMutation, MUTATION_KEYS } from '../../../config/queryClient';
import { ACTION_TYPES } from '../../../config/actionTypes';
import {
  DEFAULT_NOTE_COLOR,
  DEFAULT_NOTE_HEIGHT,
  DEFAULT_NOTE_WIDTH,
} from '../../../constants/constants';
import EditableText from './EditableText';
// import { generateRandomRotationAngle } from '../../../utils/canvas';

const useStyles = makeStyles(() => ({
  note: {
    overflow: 'auto',
    border: 'none',
    maxWidth: '30em',
    padding: '0.7em 0.8em',
    boxShadow: '5px 5px 7px rgba(33,33,33,.7)',
    cursor: 'move',
    width: 'auto',
    height: 'fit-content',
  },
  selected: {
    border: '2px solid dodgerblue',
  },
}));

const Note = ({ note, id, userName }) => {
  const {
    userSetColor,
    noteBeingEditedId,
    setNoteBeingEditedId,
    noteBeingTransformedId,
    setNoteBeingTransformedId,
  } = useContext(CanvasContext);

  const { position, size = {}, color } = note;
  const { width: w = DEFAULT_NOTE_WIDTH, height: h = DEFAULT_NOTE_HEIGHT } =
    size;

  const { pageX = 0, pageY = 0 } = position;
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const [text, setText] = useState(note?.text);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [width, setWidth] = useState(w);
  const [height, setHeight] = useState(h);

  const classes = useStyles();

  const noteRef = useRef(id);
  const contentRef = useRef(null);
  const textRef = useRef(null);
  const backgroundNoteRef = useRef(null);

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

  const handleDragEnd = () => {
    const { x, y } = noteRef.current.getAbsolutePosition();
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

  const resize = (newWidth, newHeight) => {
    setWidth(newWidth);
    setHeight(newHeight);

    const updatedNote = {
      ...note,
      size: {
        width: newWidth,
        height: newHeight,
      },
    };

    patchNote(updatedNote, ACTION_TYPES.TRANSFORM);
  };

  const transformerRef = useRef(null);

  useEffect(() => {
    if (isTransforming && transformerRef.current !== null) {
      transformerRef.current.nodes([backgroundNoteRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isTransforming]);

  const getNewSizeAfterTransform = (node) => {
    const newWidth = width * node.scaleX();
    const newHeight = height * node.scaleY();
    return {
      newWidth,
      newHeight,
    };
  };

  const handleTransform = () => {
    if (noteRef.current !== null && backgroundNoteRef.current !== null) {
      const node = backgroundNoteRef.current;
      node.setAttrs({
        x: 0,
        y: 0,
      });
    }
  };

  const handleTransformEnd = () => {
    if (noteRef.current !== null && backgroundNoteRef.current !== null) {
      const node = backgroundNoteRef.current;
      const { newWidth, newHeight } = getNewSizeAfterTransform(node);
      node.setAttrs({
        width: newWidth,
        scaleX: 1,
        height: newHeight,
        scaleY: 1,
      });
      resize(newWidth, newHeight);
    }
  };

  return (
    <Draggable
      defaultPosition={{ x: pageX, y: pageY }}
      disabled={isEditing}
      >
      <div
        className={classNames(classes.note, isTransforming && classes.selected )}
        style={{
          backgroundColor: color,
        }}
        onClick={(e) => {
          if(e.detail === 2 && !isEditing){
            toggleEdit();
          } else {
            toggleTransform();
          }
        }}
      >
        <EditableText
          x={0}
          y={0}
          text={text}
          height={height}
          isEditing={isEditing}
          isTransforming={isTransforming}
          onToggleEdit={toggleEdit}
          onToggleTransform={toggleTransform}
          onChange={handleTextEdit}
          ref={textRef}
        />
        {!isEditing && <p>{`Added by ${userName}`}</p>}
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
};

export default Note;
