import React, { useContext, useEffect, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useTranslation } from 'react-i18next';
import { Transition } from 'react-transition-group';

import { styled } from '@mui/material';
import lightBlue from '@mui/material/colors/lightBlue';

import { APP_ACTION_TYPES } from '../../../config/appActionTypes';
import { NoteDataType } from '../../../config/appDataTypes';
import { useAppDataContext } from '../../context/AppDataContext';
import { CanvasContext } from '../../context/CanvasContext';
import EditableText from './EditableText';

const animationDuration = 300;

const NoteContainer = styled('div')(({ state }: { state: string }) => ({
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
  ...(state === 'entering' || state === 'entered'
    ? {
        minWidth: '30em',
        minHeight: '10em',
        zIndex: '1',
      }
    : {
        minWidth: '0em',
        minHeight: '0em',
        zIndex: '0',
      }),
}));

const UserInfo = styled('p')(() => ({
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '10px',
  color: 'darkgrey',
  textAlign: 'right',
}));

interface NoteProps {
  note: NoteDataType;
  id: string;
  userName: string;
  scale: number;
}

const Note = ({ note, id, userName, scale }: NoteProps): JSX.Element => {
  const {
    userSetColor,
    noteBeingEditedId,
    setNoteBeingEditedId,
    noteBeingTransformedId,
    setNoteBeingTransformedId,
    setUserSetColor,
  } = useContext(CanvasContext);

  const { position, color } = note;
  const { t } = useTranslation();

  const { pageX = 0, pageY = 0 } = position;

  const { patchAppData } = useAppDataContext();

  const [text, setText] = useState(note?.text);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isFixedSize, setIsFixedSize] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  // Update the status of the note (transforming or not) if the noteBeingTransformedId changes.
  useEffect(() => {
    if (noteBeingTransformedId === id && !isTransforming) {
      setIsTransforming(true);
    } else if (noteBeingTransformedId !== id) {
      setIsTransforming(false);
    }
  }, [noteBeingTransformedId, id, isTransforming]);

  // TODO: remove.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const patchNote = (updatedNote: NoteDataType, actionType: APP_ACTION_TYPES): void => {
    const patch = {
      data: updatedNote,
      id,
    };
    patchAppData(patch);
    // TODO: reimplement actions
    // postAction({
    //   type: actionType,
    //   data: {
    //     ...updatedNote,
    //     id,
    //   },
    // });
  };

  // If the user selected color changes and the note is selected (transforming), update the color of the note.
  useEffect(() => {
    if (noteBeingTransformedId === id) {
      const updatedNote = {
        ...note,
        color: userSetColor,
      };

      patchNote(updatedNote, APP_ACTION_TYPES.EDIT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSetColor]);

  // eslint-disable-next-line no-unused-vars
  const eventControl = (event: DraggableEvent): void => {
    if (event.type === 'mousemove' || event.type === 'touchmove') {
      setIsDragging(true);
    }
    if (event.type === 'mouseup' || event.type === 'touchend') {
      setIsDragging(false);
    }
  };

  const handleDragEnd = (event: DraggableEvent, data: DraggableData): void => {
    eventControl(event);
    const { x, y } = data;
    const updatedNote = {
      ...note,
      position: {
        pageX: x,
        pageY: y,
      },
    };

    patchNote(updatedNote, APP_ACTION_TYPES.MOVE);
  };

  const toggleEdit = (): void => {
    if (isEditing) {
      setNoteBeingEditedId(null);
      setIsEditing(false);
      setIsFixedSize(false);
      const updatedNote = {
        ...note,
        text,
      };
      patchNote(updatedNote, APP_ACTION_TYPES.EDIT);
    } else {
      setNoteBeingEditedId(id);
      setIsEditing(true);
      setIsFixedSize(true);
    }
  };

  // Update the status of the note (editing or not) if the noteBeingEditedId changes.
  useEffect(() => {
    if (noteBeingEditedId === id && !isEditing) {
      setIsEditing(true);
      setIsFixedSize(true);
    } else if (noteBeingEditedId !== id && isEditing) {
      toggleEdit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteBeingEditedId]);

  const toggleTransform = (): void => {
    if (isTransforming) {
      setNoteBeingTransformedId(null);
      setIsTransforming(false);
    } else {
      setNoteBeingTransformedId(id);
      setIsTransforming(true);
      setUserSetColor(color);
    }
  };

  const handleTextEdit = (newText: string): void => {
    setText(newText);
  };

  const handleClickEvent = (e: React.MouseEvent): void => {
    e.stopPropagation();
    if (isDragging) {
      return;
    }
    // e.detail === 2 checks for double clicks.
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
          <NoteContainer
            state={state}
            sx={{
              backgroundColor: color,
              borderColor: isTransforming ? lightBlue[500] : 'none',
            }}
            onClick={handleClickEvent}
          >
            <EditableText
              text={text}
              isEditing={isEditing}
              onToggleEdit={toggleEdit}
              onChange={handleTextEdit}
            />
            {!isEditing && (
              <UserInfo>{t('Added by {{ userName }}', { userName })}</UserInfo>
            )}
          </NoteContainer>
        </Draggable>
      )}
    </Transition>
  );
};

export default Note;
