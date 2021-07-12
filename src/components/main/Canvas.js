import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import objectId from 'bson-objectid';
import Note from './note/Note';
import {
  addNote,
  postAppInstanceResource,
  getAppInstanceResources,
  patchAppInstanceResource,
  clearNoteBeingEdited,
  updateNote,
  getUsers,
} from '../../actions';
import { generateRandomRotationAngle } from '../../utils/canvas';
import Settings from '../modes/teacher/Settings';
import { RE_FETCH_INTERVAL } from '../../constants/constants';
import { TEACHER_MODES } from '../../config/settings';
import ColorSettings from './ColorSettings';

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
  const dispatch = useDispatch();
  // see onDragOver event in div below for a note on these variables
  const [newPageX, setNewPageX] = useState();
  const [newPageY, setNewPageY] = useState();

  // extract required state from redux store
  const { mode, standalone, userId } = useSelector(({ context }) => context);
  const { notes: sessionNotes, userSetColor, noteBeingEdited } = useSelector(
    ({ canvas }) => canvas,
  );
  const savedNotes = useSelector(
    ({ appInstanceResources }) => appInstanceResources.content,
  );
  const { backgroundImage } = useSelector(
    ({ appInstance }) => appInstance.content.settings,
  );

  // if session is standalone, show sessionNotes; if not, show notes retrieved from API
  const notesToDisplay = standalone ? sessionNotes : savedNotes;

  useEffect(() => {
    // fetch app instance resources once on app initialization
    dispatch(getAppInstanceResources({ userId }));
    // subsequently fetch them every RE_FETCH_INTERVAL, so that different clients remain in sync
    setInterval(() => {
      dispatch(getAppInstanceResources({ userId }));
    }, RE_FETCH_INTERVAL);
  }, []);

  useEffect(() => {
    dispatch(getUsers());
  }, [savedNotes]);

  const handleCanvasClick = (event) => {
    // if the canvas is clicked when a note is in edit mode, update that note and take it out of edit mode
    if (noteBeingEdited._id) {
      const updatedData = {
        ...noteBeingEdited.data,
        title: noteBeingEdited.data.title,
        description: noteBeingEdited.data.description,
        color: noteBeingEdited.data.color,
      };

      // dispatch for when app is not standalone (patch remote resource)
      dispatch(
        patchAppInstanceResource({
          id: noteBeingEdited._id,
          data: updatedData,
        }),
      );

      // dispatch for when app is standalone (patch note in redux store)
      dispatch(
        updateNote({
          _id: noteBeingEdited._id,
          data: updatedData,
        }),
      );

      // clear note being edited
      dispatch(clearNoteBeingEdited());
    }

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
    // dispatch for non-standalone (add remote resource)
    dispatch(postAppInstanceResource({ data: newNote, userId }));
    // dispatch for standalone (add note in redux store)
    dispatch(addNote({ data: newNote, _id: objectId() }));
  };

  return (
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
      {notesToDisplay.map((note) => (
        <Note
          note={note.data}
          id={note._id}
          key={note._id}
          userId={note.user}
          newPageX={newPageX}
          newPageY={newPageY}
        />
      ))}
      {backgroundImage?.uri && backgroundImage?.visible && (
        <img
          src={backgroundImage.uri}
          alt={`User selected background ${backgroundImage.name}`}
          className={classes.image}
        />
      )}
      {TEACHER_MODES.includes(mode) && <Settings />}
      <ColorSettings />
    </div>
  );
};

export default Canvas;
