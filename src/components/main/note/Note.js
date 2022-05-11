/* eslint-disable no-unused-vars */

import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Group, Image, Path, Rect, Text } from 'react-konva';
import { CanvasContext } from '../../context/CanvasContext';
import { DEFAULT_ANONYMOUS_USERNAME } from '../../../config/settings';
import { useMutation, MUTATION_KEYS } from '../../../config/queryClient';
import { ACTION_TYPES } from '../../../config/actionTypes';
import { DEFAULT_NOTE_COLOR } from '../../../constants/constants';
import EditableText from './EditableText';

const Note = ({
  note,
  id,
  userName,
  newPageX,
  newPageY,
  scrollLeft,
  scrollTop,
  canvasScale,
}) => {
  const { noteBeingEditedId, setNoteBeingEditedId } = useContext(CanvasContext);

  const { position, size, color } = note;
  const { w, h } = size ?? {
    w: 100,
    h: 40,
  };

  const { pageX, pageY } = position;
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const [text, setText] = useState(note.title);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [width, setWidth] = useState(w);
  const [height, setHeight] = useState(h);
  const [showActions, setShowActions] = useState(false);

  const noteRef = useRef(id);
  const contentRef = useRef(null);

  const contentRect = contentRef.current?.getClientRect({
    relativeTo: noteRef.current,
  });
  console.log(contentRect);

  const handleDragEnd = (e) => {
    const { x, y } = noteRef.current.getAbsolutePosition();
    const updatedNote = {
      data: {
        ...note,
        position: {
          pageX: x,
          pageY: y,
        },
      },
      id,
    };

    patchAppData(updatedNote);
    postAction({
      type: ACTION_TYPES.MOVE,
      data: {
        ...updatedNote.data,
        id: updatedNote.id,
      },
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const toggleTransform = () => {
    setIsTransforming(!isTransforming);
  };
  const handleDelete = () => {
    console.log('Delete');
  };
  const handleTextResize = (newWidth, newHeight) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };

  return (
    <Group
      ref={noteRef}
      x={pageX}
      y={pageY}
      onDragEnd={handleDragEnd}
      onPointerEnter={() => setShowActions(true)}
      onPointerLeave={() => setShowActions(false)}
      draggable
    >
      <Rect
        x={0}
        y={0}
        width={width + 30}
        height={height + 30}
        fill={color}
        shadowColor="black"
        shadowOffsetY={10}
        shadowOffsetX={0}
        shadowBlur={30}
        shadowOpacity={0.6}
        perfectDrawEnabled={false}
      />
      <Group x={5} y={5} ref={contentRef}>
        <EditableText
          x={0}
          y={0}
          text={text}
          width={width}
          height={height}
          onResize={handleTextResize}
          isEditing={isEditing}
          isTransforming={isTransforming}
          onToggleEdit={toggleEdit}
          onToggleTransform={toggleTransform}
          onChange={(newText) => setText(newText)}
        />
        <Text x={5} y={height + 5} text={`Added by ${userName}`} />
        {showActions ? (
          <Path
            x={width}
            y={0}
            data="M15 39H33Q33 39 33 39Q33 39 33 39V15H15V39Q15 39 15 39Q15 39 15 39ZM10.5 11V8H17.2L19.2 6H28.8L30.8 8H37.5V11ZM15 42Q13.8 42 12.9 41.1Q12 40.2 12 39V12H36V39Q36 40.2 35.1 41.1Q34.2 42 33 42ZM15 39H33Q33 39 33 39Q33 39 33 39H15Q15 39 15 39Q15 39 15 39Z"
            fill="black"
            scale={{
              x: 0.4,
              y: 0.4,
            }}
            onPointerClick={handleDelete}
          />
        ) : null}
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
    title: PropTypes.string,
    rotation: PropTypes.number.isRequired,
  }),
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  userName: PropTypes.string,
  newPageX: PropTypes.number,
  newPageY: PropTypes.number,
  scrollLeft: PropTypes.number,
  scrollTop: PropTypes.number,
  canvasScale: PropTypes.number,
};

Note.defaultProps = {
  userName: DEFAULT_ANONYMOUS_USERNAME,
  newPageX: null,
  newPageY: null,
  scrollLeft: 0,
  scrollTop: 0,
  canvasScale: 1.0,
  note: {
    color: DEFAULT_NOTE_COLOR,
    size: {
      height: 40,
      width: 40,
    },
  },
};

export default Note;
