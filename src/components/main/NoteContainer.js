import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useAppContext, useAppData } from '../context/appData';
import Note from './note/Note';
import { CanvasContext } from '../context/CanvasContext';
import { APP_DATA_TYPES } from '../../config/appDataTypes';
import { DEFAULT_ANONYMOUS_USERNAME } from '../../config/settings';

const NoteContainer = ({ edit, newPageX, newPageY }) => {
  const { t } = useTranslation();
  const [members, setMembers] = useState([]);
  const [notes, setNotes] = useState(null);
  let editFlag = edit;
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
      /* eslint-disable-next-line no-console */
      console.error(t('Error getting data.'));
      return;
    }
    if (isAppDataSuccess) {
      setNotes(appData.filter(({ type }) => type === APP_DATA_TYPES.NOTE));
    }
  }, [appData, isAppDataSuccess]);

  useEffect(() => {
    if (editFlag && !notes?.isEmpty() && isAppDataStale) {
      setNoteBeingEditedId(notes.get(-1, { id: null })?.id);
      editFlag = false;
    }
  }, [notes]);

  return (
    <div>
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
  );
};

NoteContainer.propTypes = {
  edit: PropTypes.bool.isRequired,
  newPageX: PropTypes.number.isRequired,
  newPageY: PropTypes.number.isRequired,
};

export default NoteContainer;
