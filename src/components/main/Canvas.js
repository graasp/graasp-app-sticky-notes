import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Note from './note/Note';
import { generateRandomRotationAngle } from '../../utils/canvas';
import Settings from '../modes/teacher/Settings';
import ColorSettings from './ColorSettings';
import BackgroundImage from './BackgroundImage';
import { ACTION_TYPES } from '../../config/actionTypes';
import { APP_DATA_TYPES } from '../../config/appDataTypes';
import { useAppData, useAppContext, useAppSettings } from '../context/appData';
import { useMutation, MUTATION_KEYS } from '../../config/queryClient';
import { CanvasContext } from '../context/CanvasContext';
import {
  APP_DATA_VISIBLITIES,
  DEFAULT_ANONYMOUS_USERNAME,
  DEFAULT_PERMISSION,
  PERMISSION_LEVELS,
} from '../../config/settings';
import { APP_SETTINGS } from '../../constants/constants';
import { Context } from '../context/ContextContext';
// import vpc from './vpc.png';
// import VPC from './subcanvas/VPC';

const useStyles = makeStyles(() => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    cursor: 'cell',
    background: '#FFFFFF',
    // backgroundImage: `url(${vpc})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
  },
}));

const Canvas = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [newPageX, setNewPageX] = useState();
  const [newPageY, setNewPageY] = useState();
  const [notes, setNotes] = useState(null);
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);
  const [members, setMembers] = useState([]);
  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();
  const { userSetColor, setNoteBeingEditedId } = useContext(CanvasContext);
  const [ backgroundToggleSetting, setBackgroundToggleSetting ] = useState(false);
  const context = useContext(Context);

  const [edit, setEdit] = useState(false);

  const permissionLevel = context?.get('permission', DEFAULT_PERMISSION);

  const {
    data: appData,
    isSuccess: isAppDataSuccess,
    isStale: isAppDataStale,
    isError: isAppDataError,
  } = useAppData();

  const { data: appSettings, isSuccess } = useAppSettings();

  useEffect(() => {
    if (isAppContextSuccess) {
      setMembers(appContext?.get('members'));
    }
  }, [appContext, isAppContextSuccess]);

  useEffect(() => {
    if (isAppDataError) {
      console.error('Error getting data.');
      return;
    }
    if (isAppDataSuccess) {
      setNotes(appData.filter(({ type }) => type === APP_DATA_TYPES.NOTE));
    }
  }, [appData, isAppDataSuccess]);

  useEffect(() => {
    if(isSuccess) {
      setBackgroundToggleSetting(Boolean(appSettings?.find(
        ({ name }) => name === APP_SETTINGS.BACKGROUND_TOGGLE,
      )?.data.toggle ?? false));
    }
  });

  useEffect(() => {
    if(edit && !notes?.isEmpty() && isAppDataStale) {
      setNoteBeingEditedId(notes.get(-1, {id: null})?.id); // TODO: Finish implementing immediate editing.
      console.log(notes);
      setEdit(false);
    }
  }, [notes]);

  const handleCanvasClick = (event) => {
    // add a new note to the canvas
    const { innerHeight, innerWidth } = window;
    const { pageX, pageY } = event;
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
    postAction({
      type: ACTION_TYPES.ADD,
      data: {
        note: newNote,
        id: newNote.id,
      },
    });
  };

  /* The <div> element has a child <button> element that allows keyboard interaction */
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={classes.mainContainer}
        onClick={handleCanvasClick}
        onDragOver={(event) => {
          event.stopPropagation();
          event.preventDefault();
          // when a note is dragged over this main div, the onDragOver event registers the coordinates (pageX, pageY) of the dragged note
          // these new coordinates are passed down to the note, where, once the drag event is complete, they update the final coordinates (in state + API)
          setNewPageX(event.pageX);
          setNewPageY(event.pageY);
        }}
        onDrop={(event) => {
          event.preventDefault();
        }}
      >
        {/* <VPC emitCategory={handleCategoryChange} /> */}
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
        {backgroundToggleSetting && <BackgroundImage />}
        {(permissionLevel === PERMISSION_LEVELS.WRITE || permissionLevel === PERMISSION_LEVELS.ADMIN) && <Settings />}
        <ColorSettings />
      </div>
    </>
  );
};

export default Canvas;
