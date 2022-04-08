/* The main <div> element has a child <button> element that allows keyboard interaction */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useAppContext, useAppData } from '../context/appData';
import { useMutation, MUTATION_KEYS } from '../../config/queryClient';
import { CanvasContext } from '../context/CanvasContext';
import { ACTION_TYPES } from '../../config/actionTypes';
import { APP_DATA_TYPES } from '../../config/appDataTypes';
import Note from './note/Note';
import {
  DEFAULT_ANONYMOUS_USERNAME,
  APP_DATA_VISIBLITIES,
} from '../../config/settings';
import { generateRandomRotationAngle } from '../../utils/canvas';
import { showErrorToast } from '../../utils/toasts';

const useStyles = makeStyles(() => ({
  noteContainer: {
    width: '100%',
    height: '100%',
    cursor: 'cell',
  },
}));

const NoteContainer = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const { userSetColor, noteBeingEditedId } = useContext(CanvasContext);
  const [members, setMembers] = useState([]);
  const [notes, setNotes] = useState(null);

  const [newPageX, setNewPageX] = useState(null);
  const [newPageY, setNewPageY] = useState(null);

  const [edit, setEdit] = useState(false);

  let tmpNewPageX;
  let tmpNewPageY;
  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();
  const { setNoteBeingEditedId } = useContext(CanvasContext);

  useEffect(() => {
    if (isAppContextSuccess) {
      setMembers(appContext?.get('members'));
    }
  }, [appContext, isAppContextSuccess]);

  const {
    data: appData,
    isSuccess: isAppDataSuccess,
    isStale: isAppDataStale,
    isError: isAppDataError,
  } = useAppData();

  useEffect(() => {
    if (isAppDataError) {
      showErrorToast(t('Error getting data.'));
      return;
    }
    if (isAppDataSuccess) {
      setNotes(appData.filter(({ type }) => type === APP_DATA_TYPES.NOTE));
    }
  }, [appData, isAppDataSuccess]);

  // Sets the focus to the last created note. The `edit` boolean is set to
  // true whenever a new note is created. When the notes are actually
  // refetched, the focus is set to the newest one and the `edit` bool is
  // set back to false.
  useEffect(() => {
    if (edit && !notes?.isEmpty() && isAppDataStale && notes) {
      setNoteBeingEditedId(notes.get(-1, { id: null })?.id);
      setEdit(false);
    }
  }, [notes]);

  const createNewNote = (pageX, pageY) => {
    if (noteBeingEditedId === null) {
      // add a new note to the canvas
      const { innerHeight, innerWidth } = window;

      const newNote = {
        windowDimensions: { innerHeight, innerWidth },
        position: { pageX, pageY },
        color: userSetColor,
        rotation: generateRandomRotationAngle(),
        minimized: false,
      };

      postAppData({
        data: newNote,
        type: APP_DATA_TYPES.NOTE,
        visibility: APP_DATA_VISIBLITIES.ITEM,
      });
      setEdit(true);
      postAction({
        type: ACTION_TYPES.ADD,
        data: {
          note: newNote,
          id: newNote.id,
        },
      });
    }
  };

  const handleCanvasClick = (event) => {
    const { pageX, pageY } = event;
    createNewNote(pageX, pageY);
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={classes.noteContainer}
        onDragOver={(event) => {
          event.stopPropagation();
          event.preventDefault();
          // when a note is dragged over this main div, the onDragOver event registers the coordinates (pageX, pageY) of the dragged note
          // these new coordinates are passed down to the note, where, once the drag event is complete, they update the final coordinates (in state + API)
          tmpNewPageX = event.pageX;
          tmpNewPageY = event.pageY;
        }}
        onDrop={(event) => {
          event.preventDefault();
          setNewPageX(tmpNewPageX);
          setNewPageY(tmpNewPageY);
        }}
        onClick={handleCanvasClick}
      >
        {notes ? (
          notes.map((note) => (
            <Note
              note={note.data}
              id={note.id}
              key={note.id}
              userName={
                (
                  members.find((m) => m.id === note.memberId) ?? {
                    name: DEFAULT_ANONYMOUS_USERNAME,
                  }
                ).name
              }
              newPageX={newPageX}
              newPageY={newPageY}
            />
          ))
        ) : (
          <div>{t('Add a note.')}</div>
        )}
      </div>
    </>
  );
};

export default NoteContainer;
