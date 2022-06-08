import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Group, Transformer, Rect, Text } from 'react-konva';
import { CanvasContext } from '../../context/CanvasContext';
import { DEFAULT_ANONYMOUS_USERNAME } from '../../../config/settings';
import { useMutation, MUTATION_KEYS } from '../../../config/queryClient';
import { ACTION_TYPES } from '../../../config/actionTypes';
import { DEFAULT_NOTE_COLOR } from '../../../constants/constants';
import EditableText from './EditableText';
// import { generateRandomRotationAngle } from '../../../utils/canvas';

const DEFAULT_STYLE = {
  minHeight: 120,
  minWidth: 80,
  paddingTop: 5,
  paddingLeft: 5,
  paddingBottom: 5,
  paddingRight: 5,
};


const Note = ({ note, id, userName }) => {
  const {
    userSetColor,
    noteBeingEditedId,
    setNoteBeingEditedId,
    noteBeingTransformedId,
    setNoteBeingTransformedId,
  } = useContext(CanvasContext);

  const { position, size, color } = note;
  const { width: w, height: h } = size;

  const { pageX, pageY } = position;
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const [text, setText] = useState(note?.text);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [width, setWidth] = useState(w);
  const [height, setHeight] = useState(h);
  const [style, setStyle] = useState(DEFAULT_STYLE);

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
    if(noteBeingTransformedId === id) {
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

  const setMinSize = (minWidth = null, minHeight = null) => {
    let mh = style.minHeight;
    let mw = style.minWidth;
    if(minHeight !== null) {
      mh = minHeight;
    }
    if(minWidth !== null) {
      mw = minWidth;
    }
    setStyle({
      ...style,
      minWidth: mw,
      minHeight: mh,
    });
  };

  useEffect(() => {
    if(width<style.minWidth) {
      setWidth(style.minWidth);
    }
    if(height<style.minHeight) {
      setHeight(style.minHeight);
    }
  }, [style]);

  const transformerRef = useRef(null);

  useEffect(() => {
    if (isTransforming && transformerRef.current !== null) {
      transformerRef.current.nodes([backgroundNoteRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isTransforming]);

  const transformer = isTransforming ? (
    <Transformer
      ref={transformerRef}
      rotateEnabled={false}
      flipEnabled={false}
      enabledAnchors={['middle-right', 'bottom-center', 'bottom-right']}
      boundBoxFunc={(oldBox, newBox) => {
        const b = newBox;
        b.width = Math.max(style.minWidth, newBox.width);
        b.height = Math.max(style.minHeight, newBox.height);
        return b;
      }}
    />
  ) : null;

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
      <Group
        ref={noteRef}
        x={pageX}
        y={pageY}
        name="note"
        onDragEnd={handleDragEnd}
        onClick={(e) => {
          e.cancelBubble = true;
        }}
        draggable
      >
        <>
          <Rect
            ref={backgroundNoteRef}
            x={0}
            y={0}
            width={width}
            height={height}
            fill={color}
            shadowColor="black"
            shadowOffsetY={10}
            shadowOffsetX={0}
            shadowBlur={30}
            shadowOpacity={0.6}
            perfectDrawEnabled={false}
            onClick={toggleTransform}
            onTransform={handleTransform}
            onTransformEnd={handleTransformEnd}
          />
          {transformer}
        </>
        <Group x={5} y={5} ref={contentRef}>
          <EditableText
            x={0}
            y={0}
            text={text}
            width={width}
            height={height}
            isEditing={isEditing}
            isTransforming={isTransforming}
            onToggleEdit={toggleEdit}
            onToggleTransform={toggleTransform}
            onChange={handleTextEdit}
            onContentResize={setMinSize}
            ref={textRef}
          />
          <Text x={5} y={height - 20} text={`Added by ${userName}`} />
        </Group>
      </Group>
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
