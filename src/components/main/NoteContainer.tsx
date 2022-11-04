/* eslint-disable jsx-a11y/click-events-have-key-events */
import { List } from 'immutable';

import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material';

import {
  APP_DATA_TYPES,
  ExistingNoteType,
  NoteDataType,
} from '../../config/appDataTypes';
import { DEFAULT_ANONYMOUS_USERNAME } from '../../config/settings';
import { APP_DATA_VISIBILITY } from '../../types/appData';
import { useAppDataContext } from '../context/AppDataContext';
import { CanvasContext } from '../context/CanvasContext';
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
}

const NoteContainer = (props: NoteContainerInterface): JSX.Element => {
  const { scrollLeft, scrollTop, canvasScale } = props;
  const { t } = useTranslation();

  const {
    userSetColor,
    noteBeingEditedId,
    noteBeingTransformedId,
    setNoteBeingTransformedId,
  } = useContext(CanvasContext);

  const members = useMembersContext();
  const [notes, setNotes] = useState<List<ExistingNoteType>>();

  const [edit, setEdit] = useState(false);

  const { setNoteBeingEditedId } = useContext(CanvasContext);

  const { postAppData, appDataArray: appData } = useAppDataContext();

  useEffect(() => {
    setNotes(
      appData.filter(
        ({ type }) => type === APP_DATA_TYPES.NOTE,
      ) as unknown as List<ExistingNoteType>,
    );
  }, [appData]);

  // Sets the focus to the last created note. The `edit` boolean is set to
  // true whenever a new note is created. When the notes are actually
  // refetched, the focus is set to the newest one and the `edit` bool is
  // set back to false.
  useEffect(() => {
    if (edit && !notes?.isEmpty() && notes) {
      setNoteBeingEditedId(notes.get(-1, { id: null })?.id);
      setEdit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  const createNewNote = (pageX: number, pageY: number): void => {
    const newNote: NoteDataType = {
      position: { pageX, pageY },
      color: userSetColor,
      text: '',
    };

    postAppData({
      data: newNote,
      type: APP_DATA_TYPES.NOTE,
      visibility: APP_DATA_VISIBILITY.ITEM,
    });
    setEdit(true);
    // TODO: reimplement actions.
    // postAction({
    //   type: ACTION_TYPES.ADD,
    //   data: {
    //     ...newNote,
    //   },
    // });
  };

  const handleCanvasClick = (event: React.MouseEvent): void => {
    if (!noteBeingEditedId && !noteBeingTransformedId) {
      const { pageX: x, pageY: y } = event;
      createNewNote(
        (x + scrollLeft) / canvasScale,
        (y + scrollTop) / canvasScale,
      );
    } else {
      setNoteBeingEditedId(null);
      setNoteBeingTransformedId(null);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <StyledNoteContainer onClick={handleCanvasClick}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      {notes ? (
        notes.map((note) => (
          <Note
            note={note.data}
            id={note.id}
            key={note.id}
            userName={
              members.find((m) => m.id === note.memberId)?.name ??
              DEFAULT_ANONYMOUS_USERNAME
            }
            scale={canvasScale}
          />
        ))
      ) : (
        <p>{t('Add a note.')}</p>
      )}
    </StyledNoteContainer>
  );
};

export default NoteContainer;
