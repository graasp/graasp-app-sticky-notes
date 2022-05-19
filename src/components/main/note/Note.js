/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Group, Transformer, Path, Rect, Text } from 'react-konva';
import { CanvasContext } from '../../context/CanvasContext';
import { DEFAULT_ANONYMOUS_USERNAME } from '../../../config/settings';
import { useMutation, MUTATION_KEYS } from '../../../config/queryClient';
import { ACTION_TYPES } from '../../../config/actionTypes';
import { DEFAULT_NOTE_COLOR } from '../../../constants/constants';
import EditableText from './EditableText';
import { generateRandomRotationAngle } from '../../../utils/canvas';

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
    noteBeingEditedId,
    setNoteBeingEditedId,
    noteBeingTransformedId,
    setNoteBeingTransformedId,
  } = useContext(CanvasContext);

  const { position, size, color } = note;
  const { width: w, height: h } = size;

  const { pageX, pageY } = position;
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: deleteAppData } = useMutation(MUTATION_KEYS.DELETE_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const [text, setText] = useState(note?.text);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [width, setWidth] = useState(w);
  const [height, setHeight] = useState(h);
  const [showActions, setShowActions] = useState(false);
  const [style, setStyle] = useState(DEFAULT_STYLE);

  const noteRef = useRef(id);
  const contentRef = useRef(null);
  const deleteActionRef = useRef(null);
  const textRef = useRef(null);
  const backgroundNoteRef = useRef(null);

  const [deleteActionRect, setDeleteActionRect] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (noteBeingTransformedId === id && !isTransforming) {
      setIsTransforming(true);
    } else if (noteBeingTransformedId !== id) {
      console.log("B");
      setIsTransforming(false);
    }
    console.log("Effect isTransforming", isTransforming);
  }, [noteBeingTransformedId]);

  useEffect(() => {
    const tmpDeleteActionRect = deleteActionRef.current?.getSelfRect();
    if (tmpDeleteActionRect) {
      setDeleteActionRect(tmpDeleteActionRect);
    }
  }, [showActions, deleteActionRef]);

  const patchNote = (updatedNote, actionType) => {
    const patch = {
      data: note,
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

  const handleDragEnd = (e) => {
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
  
  const toggleTransform = (e) => {
    console.log("Toggle transform: ", e, " is Transforming: ", isTransforming);
    if (isTransforming) {
      setNoteBeingTransformedId(null);
      setIsTransforming(false);
    } else {
      console.log("A");
      setNoteBeingTransformedId(id);
      console.log("C");
      setIsTransforming(true);
      console.log("D, isTransforming:", isTransforming);
    }
  };
  const handleDelete = (e) => {
    console.log(e);
    e.evt.cancelBubble = true; // TODO: prevent event propagation...
    setNoteBeingEditedId(null);
    setNoteBeingTransformedId(null);
    deleteAppData({
      id,
    });
    postAction({
      type: ACTION_TYPES.DELETE,
      data: { id },
    });
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
      // const backgroundRect = backgroundNoteRef.current;
      const { newWidth, newHeight } = getNewSizeAfterTransform(node);
      node.setAttrs({
        x: 0,
        y: 0,
      });
      // console.log("It is resizing !");
      // handleTextResize(newWidth, newHeight);
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
        onPointerEnter={() => setShowActions(true)}
        onPointerLeave={() => setShowActions(false)}
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
          {/* {showActions ? (
            <Group x={width} y={0}>
              <Rect
                width={deleteActionRect?.width}
                height={deleteActionRect?.height}
                fill="red"
                opacity={1.0}
                onPointerClick={handleDelete}
              />
              <Path
                ref={deleteActionRef}
                data="M15 39H33Q33 39 33 39Q33 39 33 39V15H15V39Q15 39 15 39Q15 39 15 39ZM10.5 11V8H17.2L19.2 6H28.8L30.8 8H37.5V11ZM15 42Q13.8 42 12.9 41.1Q12 40.2 12 39V12H36V39Q36 40.2 35.1 41.1Q34.2 42 33 42ZM15 39H33Q33 39 33 39Q33 39 33 39H15Q15 39 15 39Q15 39 15 39Z"
                fill="black"
                scale={{
                  x: 0.4,
                  y: 0.4,
                }}
              />
            </Group>
          ) : null} */}
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
