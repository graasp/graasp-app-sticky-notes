import { List } from 'immutable';

import React, { useEffect, useState } from 'react';

import { AppDataVisibility } from '@graasp/sdk';

import { SxProps, styled } from '@mui/material';

import { APP_ACTION_TYPES } from '../../config/appActionTypes';
import {
  APP_DATA_TYPES,
  ExistingNoteTypeRecord,
  NoteDataType,
} from '../../config/appDataTypes';
import { NOTE_CONTAINER_CY } from '../../config/selectors';
import { DEFAULT_ANONYMOUS_USERNAME } from '../../config/settings';
import { useAppActionContext } from '../context/AppActionContext';
import { useAppDataContext } from '../context/AppDataContext';
import { useCanvasContext } from '../context/CanvasContext';
import { useMembersContext } from '../context/MembersContext';
import Note from './note/Note';

const StyledNoteContainer = styled('div')(() => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0px',
  left: '0px',
}));

interface NoteContainerInterface {
  scrollLeft: number;
  scrollTop: number;
  canvasScale: number;
  sx?: SxProps;
}

const NoteContainer = (props: NoteContainerInterface): JSX.Element => {
  const { scrollLeft, scrollTop, canvasScale, sx } = props;

  const {
    userSetColor,
    noteBeingEditedId,
    setNoteBeingEditedId,
    noteBeingTransformedId,
    setNoteBeingTransformedId,
  } = useCanvasContext();

  const members = useMembersContext();
  const [notes, setNotes] = useState<List<ExistingNoteTypeRecord>>();

  const [edit, setEdit] = useState(false);

  const { postAppDataAsync, appDataArray: appData } = useAppDataContext();
  const { postAppAction } = useAppActionContext();

  useEffect(() => {
    setNotes(
      appData.filter(
        ({ type }) => type === APP_DATA_TYPES.NOTE,
      ) as unknown as List<ExistingNoteTypeRecord>,
    );
  }, [appData]);

  // Sets the focus to the last created note. The `edit` boolean is set to
  // true whenever a new note is created. When the notes are actually
  // refetched, the focus is set to the newest one and the `edit` bool is
  // set back to false.
  useEffect(() => {
    if (notes && !notes.isEmpty()) {
      if (edit) {
        setNoteBeingEditedId(notes.get(-1)?.id ?? null);
        setEdit(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  const createNewNote = (pageX: number, pageY: number): void => {
    const newNote: NoteDataType = {
      position: { pageX, pageY },
      color: userSetColor,
      text: '',
    };

    postAppDataAsync({
      data: newNote,
      type: APP_DATA_TYPES.NOTE,
      visibility: AppDataVisibility.Item,
    }).then((data) => {
      postAppAction({
        type: APP_ACTION_TYPES.ADD,
        data,
      });
    });
    setEdit(true);
  };

  const handleCanvasClick = (event: React.MouseEvent): void => {
    // `event.detail === 2` checks that the event is a double click.
    if (!noteBeingEditedId && !noteBeingTransformedId && event.detail === 2) {
      const { pageX: x, pageY: y } = event;
      createNewNote(
        (x - scrollLeft) / canvasScale,
        (y - scrollTop) / canvasScale,
      );
    } else {
      setNoteBeingTransformedId(null);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <StyledNoteContainer
      data-cy={NOTE_CONTAINER_CY}
      onClick={handleCanvasClick}
      sx={sx}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      {notes?.map((note) => (
        <Note
          note={note.data}
          id={note.id}
          key={note.id}
          userName={
            members.find((m) => m.id === note.member?.id)?.name ??
            DEFAULT_ANONYMOUS_USERNAME
          }
          scale={canvasScale}
        />
      ))}
    </StyledNoteContainer>
  );
};

export default NoteContainer;
