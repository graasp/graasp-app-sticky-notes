import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Note from './note/Note';
import { generateRandomRotationAngle } from '../../utils/canvas';
import Settings from '../modes/teacher/Settings';
import { DEFAULT_NOTE_COLOR } from '../../constants/constants';
import { DEFAULT_PERMISSION } from '../../config/settings';
import ColorSettings from './ColorSettings';
import { ACTION_TYPES } from '../../config/actionTypes';
import { APP_DATA_TYPES } from '../../config/appDataTypes';
import { useAppData } from '../context/appData';
import { useMutation, MUTATION_KEYS } from '../../config/queryClient';
import { Context } from '../context/ContextContext';
import CanvasContext from '../context/CanvasContext';

const useStyles = makeStyles(() => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    cursor: 'cell',
    background: '#FFE4E1',
  },
  image: { width: '100%', height: '100%', display: 'block' },
}));

const Canvas = () => {
  const classes = useStyles();
  const [newPageX, setNewPageX] = useState();
  const [newPageY, setNewPageY] = useState();
  const [notes, setNotes] = useState(null);
  const [noteBeingEditedId, setNoteBeingEditedId] = useState(null);
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation('MUTATION_KEYS.POST_APP_DATA');
  const [userSetColor, setUserSetColor] = useState(DEFAULT_NOTE_COLOR);
  const context = useContext(Context);

  const [backgroundImage,] = useState(context?.get('settings')?.backgroundImage);

  const {
    data: appData,
    /* eslint-disable-next-line no-unused-vars */
    isLoading: isAppDataLoading,
    isSuccess: isAppDataSuccess,
  } = useAppData();

  useEffect(() => {
    if (isAppDataSuccess && !appData.isEmpty()) {
      setNotes(appData.filter(({ type }) => type === APP_DATA_TYPES.NOTE));
    } else if (isAppDataSuccess && appData.isEmpty()) {
      setNotes(null);
    }
  }, [appData, isAppDataSuccess, postAppData]);

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

    if (newNote?.id) {
      patchAppData({
        data: newNote,
        id: notes.id,
      });
    } else {
      postAppData({
        data: newNote,
        type: APP_DATA_TYPES.NOTE,
      });
    }
    postAction({
      verb: ACTION_TYPES.ADD,
      data: {
        data: newNote,
        id: newNote.id,
      },
    });
  };

  /* The <div> element has a child <button> element that allows keyboard interaction */
  return (
    <CanvasContext.Provider value={{
      noteBeingEditedId,
      setNoteBeingEditedId,
      userSetColor,
      setUserSetColor
      }}>
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
      >
        {notes ? (
          notes.map((note) => (
            <Note
              note={note.data}
              id={note.id}
              key={note.id}
              userId={note.user}
              newPageX={newPageX}
              newPageY={newPageY}
            />)) ):(<div>Add a note.</div>)
        }
        { backgroundImage?.uri && backgroundImage?.visible && (
          <img
            src={backgroundImage.uri}
            alt={`User selected background ${backgroundImage.name}`}
            className={classes.image}
          />
        )}
        {(context?.get('permission', DEFAULT_PERMISSION) === 'write') && <Settings />}
        <ColorSettings />
      </div>
    </CanvasContext.Provider>
  );
};

export default Canvas;
