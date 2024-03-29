import React, { useEffect, useState } from 'react';
import Draggable, {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from 'react-draggable';
import { useTranslation } from 'react-i18next';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Stack, Tooltip, styled } from '@mui/material';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import lightBlue from '@mui/material/colors/lightBlue';

import { APP_ACTION_TYPES } from '../../../config/appActionTypes';
import {
  ExistingNoteTypeRecord,
  NoteDataType,
} from '../../../config/appDataTypes';
import { FADE_ANIMATION_TIME } from '../../../config/constants';
import { NOTE_CY } from '../../../config/selectors';
import NoteAvatars from '../../common/NoteAvatars';
import { useAppActionContext } from '../../context/AppActionContext';
import { useAppDataContext } from '../../context/AppDataContext';
import { useCanvasContext } from '../../context/CanvasContext';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import EditDialog from './EditDialog';
import EditableText from './EditableText';

const NoteContainer = styled('div')(() => ({
  overflow: 'visible',
  border: '1px solid',
  borderColor: 'rgba(255, 255, 255, 0)',
  maxWidth: '30em',
  padding: '0.7em 0.8em',
  boxShadow: '3px 3px 4px rgba(33,33,33,.7)',
  cursor: 'move',
  height: 'fit-content',
  position: 'absolute',
  minWidth: '0em',
  minHeight: '0em',
  zIndex: '0',
  '& .action-button': {
    display: 'none',
  },
  '&:hover .action-button': {
    display: 'block',
  },
}));

const SmallActionButton = styled(IconButton)(() => ({
  borderRadius: '50%',
  position: 'absolute',
  scale: [0.5, 0.5, 1],
  fontSize: '0rem', // Ensures button remains square.
}));

interface NoteProps {
  note: ExistingNoteTypeRecord['data'];
  id: string;
  userName: string;
  scale: number;
}

const Note = ({ note, id, userName, scale }: NoteProps): JSX.Element => {
  const { t } = useTranslation();
  const {
    userSetColor,
    noteBeingEditedId,
    setNoteBeingEditedId,
    noteBeingTransformedId,
    setNoteBeingTransformedId,
    setUserSetColor,
  } = useCanvasContext();

  const { text: initialText, position, color } = note;

  const { pageX: initialPageX = 0, pageY: initialPageY = 0 } = position;

  const [pageX, setPageX] = useState(initialPageX);
  const [pageY, setPageY] = useState(initialPageY);

  const { patchAppData } = useAppDataContext();
  const { postAppAction } = useAppActionContext();
  const { deleteAppData } = useAppDataContext();

  const [text, setText] = useState(initialText);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAskingToDelete, setIsAskingToDelete] = useState(false);
  const [exist, setExist] = useState(true);

  const [isDragging, setIsDragging] = useState(false);

  // Update the status of the note (transforming or not) if the noteBeingTransformedId changes.
  useEffect(() => {
    if (noteBeingTransformedId === id && !isTransforming) {
      setIsTransforming(true);
    } else if (noteBeingTransformedId !== id) {
      setIsTransforming(false);
    }
  }, [noteBeingTransformedId, id, isTransforming]);

  const patchNote = (
    updatedNote: NoteDataType,
    actionType: APP_ACTION_TYPES,
  ): void => {
    const patch = {
      data: updatedNote,
      id,
    };
    patchAppData(patch);
    postAppAction({
      type: actionType,
      data: {
        ...updatedNote,
        id,
      },
    });
  };

  // If the user selected color changes and the note is selected (transforming), update the color of the note.
  useEffect(() => {
    if (noteBeingTransformedId === id && color !== userSetColor) {
      const updatedNote = {
        ...(note.toJS() as NoteDataType),
        color: userSetColor,
      };

      patchNote(updatedNote, APP_ACTION_TYPES.EDIT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSetColor]);

  const eventControl: DraggableEventHandler = (
    event: DraggableEvent,
    data: DraggableData,
  ): void => {
    if (event.type === 'mousemove' || event.type === 'touchmove') {
      setIsDragging(true);
      setPageX(data.x);
      setPageY(data.y);
    }
    if (event.type === 'mouseup' || event.type === 'touchend') {
      setIsDragging(false);
    }
  };

  const handleDragEnd = (event: DraggableEvent, data: DraggableData): void => {
    eventControl(event, data);
    const { x, y } = data;
    if (initialPageX !== x || initialPageY !== y) {
      const updatedNote = {
        ...note.toJS(),
        position: {
          pageX: x,
          pageY: y,
        },
      };
      patchNote(updatedNote, APP_ACTION_TYPES.MOVE);
    }
  };

  const toggleEdit = (force?: boolean): void => {
    if (typeof force !== 'undefined') {
      if (force) {
        setNoteBeingEditedId(id);
        setIsEditing(true);
      } else {
        setNoteBeingEditedId(null);
        setIsEditing(false);
      }
    } else if (isEditing) {
      setNoteBeingEditedId(null);
      setIsEditing(false);
    } else {
      setNoteBeingEditedId(id);
      setIsEditing(true);
    }
  };

  // Update the status of the note (editing or not) if the noteBeingEditedId changes.
  useEffect(() => {
    if (noteBeingEditedId === id && !isEditing) {
      setIsEditing(true);
    } else if (noteBeingEditedId !== id && isEditing) {
      toggleEdit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteBeingEditedId]);

  // May be redundant. This effect updates the text when the props change
  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  // May be redundant. This effect updates the text when the props change
  useEffect(() => {
    setPageX(initialPageX);
    setPageY(initialPageY);
  }, [initialPageX, initialPageY]);

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

  const handleUpdate = (newText: string, newColor?: string): void => {
    setText(newText);
    const updatedNote = {
      ...(note.toJS() as NoteDataType),
      text: newText,
    };
    if (typeof newColor !== 'undefined') {
      updatedNote.color = newColor;
    }
    patchNote(updatedNote, APP_ACTION_TYPES.EDIT);
  };

  const handleDelete = (): void => {
    toggleEdit(false);
    setIsAskingToDelete(false);
    setExist(false);
    setTimeout(() => {
      deleteAppData({ id });
      postAppAction({
        type: APP_ACTION_TYPES.DELETE,
        data: { id },
      });
    }, FADE_ANIMATION_TIME);
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
    <>
      <Draggable
        position={{ x: pageX, y: pageY }}
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
        <Fade in={exist} timeout={FADE_ANIMATION_TIME}>
          {/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <NoteContainer
            sx={{
              backgroundColor: color,
              borderColor: isTransforming ? lightBlue[500] : 'none',
            }}
            onClick={handleClickEvent}
            data-cy={`${NOTE_CY}-${id}`}
          >
            <EditableText text={text} />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <NoteAvatars userName={userName} small />
            </Stack>
            <Tooltip title={t('Delete')}>
              <SmallActionButton
                className="action-button"
                size="small"
                sx={{ top: 1, right: 1 }}
                onClick={() => {
                  setIsAskingToDelete(true);
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </SmallActionButton>
            </Tooltip>
            <Tooltip title={t('EDIT')}>
              <SmallActionButton
                className="action-button"
                size="small"
                sx={{ bottom: 1, left: 1 }}
                onClick={() => toggleEdit(true)}
              >
                <EditOutlinedIcon />
              </SmallActionButton>
            </Tooltip>
          </NoteContainer>
        </Fade>
      </Draggable>
      <EditDialog
        open={isEditing}
        note={note}
        id={id}
        userName={userName}
        onCancel={() => toggleEdit(false)}
        onSave={(newText, newColor?) => {
          handleUpdate(newText, newColor);
          toggleEdit(false);
        }}
        onDelete={() => setIsAskingToDelete(true)}
      />
      <DeleteConfirmDialog
        open={isAskingToDelete}
        onCancel={() => setIsAskingToDelete(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Note;
