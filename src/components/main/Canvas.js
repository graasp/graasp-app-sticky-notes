import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Note from './note/Note';
import { generateRandomRotationAngle } from '../../utils/canvas';
import Settings from '../modes/teacher/Settings';
import ColorSettings from './ColorSettings';
import BackgroundImage from './BackgroundImage';
import { ACTION_TYPES } from '../../config/actionTypes';
import { APP_DATA_TYPES } from '../../config/appDataTypes';
import { useAppData, useAppContext, /* useAppActions */ } from '../context/appData';
import { useMutation, MUTATION_KEYS } from '../../config/queryClient';
import { CanvasContext } from '../context/CanvasContext';

const useStyles = makeStyles(() => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    cursor: 'cell',
    background: '#FFE4E1',
  },
}));

const Canvas = () => {
  const classes = useStyles();
  const [newPageX, setNewPageX] = useState();
  const [newPageY, setNewPageY] = useState();
  const [notes, setNotes] = useState(null);
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);
  const [members, setMembers] = useState([]);
  const { data: appContext, isLoading: isAppContextLoading } = useAppContext();
  const { userSetColor } = useContext(CanvasContext);

  const {
    data: appData,
    /* eslint-disable-next-line no-unused-vars */
    isLoading: isAppDataLoading,
    isSuccess: isAppDataSuccess,
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
        visibility: 'item',
      });
    }
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
            />
          ))
        ) : (
          <div>Add a note.</div>
        )}
        <BackgroundImage />
        <Settings />
        <ColorSettings />
      </div>
    </>
  );
};

export default Canvas;
