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
import { useAppData, useAppContext, /* useAppActions */ } from '../context/appData';
import { useMutation, MUTATION_KEYS } from '../../config/queryClient';
import { Context } from '../context/ContextContext';
import CanvasContext from '../context/CanvasContext';
import vpc from './vpc.png';

const useStyles = makeStyles(() => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    cursor: 'cell',
    background: '#FFFFFF',
    backgroundImage: `url(${vpc})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
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
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);
  const [userSetColor, setUserSetColor] = useState(DEFAULT_NOTE_COLOR);
  const [members, setMembers] = useState([]);
  const context = useContext(Context);
  const { data: appContext, isLoading: isAppContextLoading } = useAppContext();

  const [edit, setEdit] = useState(false);

  // eslint-disable-next-line react/destructuring-assignment
  const [backgroundImage,] = useState(context?.get('settings')?.backgroundImage);

  const {
    data: appData,
    /* eslint-disable-next-line no-unused-vars */
    isLoading: isAppDataLoading,
    isSuccess: isAppDataSuccess,
    isStale: isAppDataStale,
  } = useAppData();

  useEffect(() => {
    if(isAppContextLoading) {
      setMembers([]);
    } else {
      setMembers(appContext?.get('members'))
    }
  }, [appContext, isAppContextLoading]);

  useEffect(() => {
    if (isAppDataSuccess && !appData.isEmpty()) {
      setNotes(appData.filter(({ type }) => type === APP_DATA_TYPES.NOTE));
    } else if (isAppDataSuccess && appData.isEmpty()) {
      setNotes(null);
    }
  }, [appData, isAppDataSuccess, postAppData]);

  useEffect(() => {
    if(edit && !notes?.isEmpty() && isAppDataStale) {
      setNoteBeingEditedId(notes.get(-1, {id: null})?.id); // TODO: Finish implementing immediate editing.
      console.log(notes);
      setEdit(false);
    }
  }, [notes]);

  const handleCanvasClick = (event) => {
    if(noteBeingEditedId===null) {
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
          visibility: 'item',
        });
        setEdit(true);
      }
      postAction({
        type: ACTION_TYPES.ADD,
        data: {
          note: newNote,
          id: newNote.id,
        },
      });
    } else {
      setNoteBeingEditedId(null);
    }
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
              userName={(members.find((m) => m.id === note.memberId) ?? {name:'AnonymousA'}).name}
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
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {(context?.get('permission', DEFAULT_PERMISSION) === 'write') && <Settings />}
        <ColorSettings />
      </div>
    </CanvasContext.Provider>
  );
};

export default Canvas;
