/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
import {
  DEFAULT_NOTE_HEIGHT,
  DEFAULT_NOTE_WIDTH,
} from '../../constants/constants';

const useStyles = makeStyles(() => ({
  noteContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px',
  },
}));

const NoteContainer = ({ scrollLeft, scrollTop, canvasScale }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const {
    userSetColor,
    noteBeingEditedId,
    noteBeingTransformedId,
    setNoteBeingTransformedId,
  } = useContext(CanvasContext);

  const [members, setMembers] = useState([]);
  const [notes, setNotes] = useState(null);

  const [edit, setEdit] = useState(false);

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

  const errorDataMsg = t('Error getting data.');
  useEffect(() => {
    if (isAppDataError) {
      showErrorToast(errorDataMsg);
      return;
    }
    if (isAppDataSuccess) {
      setNotes(appData.filter(({ type }) => type === APP_DATA_TYPES.NOTE));
    }
  }, [appData, isAppDataSuccess, errorDataMsg, isAppDataError]);

  // Sets the focus to the last created note. The `edit` boolean is set to
  // true whenever a new note is created. When the notes are actually
  // refetched, the focus is set to the newest one and the `edit` bool is
  // set back to false.
  useEffect(() => {
    if (edit && !notes?.isEmpty() && isAppDataStale && notes) {
      setNoteBeingEditedId(notes.get(-1, { id: null })?.id);
      setEdit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  const createNewNote = (pageX, pageY) => {
    const newNote = {
      position: { pageX, pageY },
      size: { height: DEFAULT_NOTE_HEIGHT, width: DEFAULT_NOTE_WIDTH },
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
        ...newNote,
        id: newNote.id,
      },
    });
  };

  const handleCanvasClick = (event) => {
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
    <div className={classes.noteContainer} onClick={handleCanvasClick}>
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
    </div>
  );
};

NoteContainer.propTypes = {
  scrollLeft: PropTypes.number.isRequired,
  scrollTop: PropTypes.number.isRequired,
  canvasScale: PropTypes.number.isRequired,
};

export default NoteContainer;
