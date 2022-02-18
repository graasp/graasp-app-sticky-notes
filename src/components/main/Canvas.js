/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// import objectId from 'bson-objectid';
import Note from './note/Note';
import {
//  addNote,
//  postAppInstanceResource,
//  getAppInstanceResources,
  patchAppInstanceResource,
  clearNoteBeingEdited,
  updateNote,
  getUsers,
} from '../../actions';
import { generateRandomRotationAngle } from '../../utils/canvas';
import Settings from '../modes/teacher/Settings';
// import { RE_FETCH_INTERVAL } from '../../constants/constants';
import { TEACHER_MODES, DEFAULT_PERMISSION } from '../../config/settings';
import ColorSettings from './ColorSettings';
import { ACTION_TYPES } from '../../config/actionTypes';
import { useAppData } from '../context/appData';
import { useMutation, MUTATION_KEYS } from '../../config/queryClient';
import { SAVED } from '../../config/verbs';
import { Context } from '../context/ContextContext';

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
  // const dispatch = useDispatch();
  // see onDragOver event in div below for a note on these variables
  const [newPageX, setNewPageX] = useState();
  const [newPageY, setNewPageY] = useState();
  const [notes, setNotes] = useState(null);
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation('MUTATION_KEYS.POST_APP_DATA');
  const [userSetColor, setUserSetColor] = useState(null);
  const context = useContext(Context);

  // extract required state from redux store
  // const { mode, standalone, userId } = useSelector(({ context }) => context);
  /* const { notes: sessionNotes, userSetColor, noteBeingEdited } = useSelector(
    ({ canvas }) => canvas,
  ); */
  /* const savedNotes = useSelector(
    ({ appInstanceResources }) => appInstanceResources.content,
  ); */
  /* const { backgroundImage } = useSelector(
    ({ appInstance }) => appInstance.content.settings,
  ); */

  const {
    data: appData,
    isLoading: isAppDataLoading,
    isSuccess: isAppDataSuccess,
  } = useAppData();

  useEffect(() => {
    if (isAppDataSuccess && !appData.isEmpty()) {
      //  suppose take first
      // setNotes(appData.findAll(({ type }) => type === ACTION_TYPES.NOTE));
      setNotes(appData.filter(({ type }) => type === ACTION_TYPES.NOTE));
      // setNotes(appData);
      console.debug(appData.filter(({ type }) => type === ACTION_TYPES.NOTE));
      /* setFeedbackResource(
        appData.find(({ type }) => type === ACTION_TYPES.FEEDBACK)
      ); */
    }

    // create this resource once data is loaded and is empty
  }, [appData, isAppDataSuccess, postAppData]);

  // if session is standalone, show sessionNotes; if not, show notes retrieved from API
  // const notesToDisplay = standalone ? sessionNotes : savedNotes;
  // const notesToDisplay = notes;

  /* useEffect(() => { 
    dispatch(getUsers());
  }, [savedNotes]); */

  const handleCanvasClick = (event) => {
    // if the canvas is clicked when a note is in edit mode, update that note and take it out of edit mode
    // if (noteBeingEdited._id) {
      /* const updatedData = {
        ...noteBeingEdited.data,
        title: noteBeingEdited.data.title,
        description: noteBeingEdited.data.description,
        color: noteBeingEdited.data.color,
      }; */

      // dispatch for when app is not standalone (patch remote resource)
      /* dispatch(
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
      dispatch(clearNoteBeingEdited()); */
    // }

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
        type: ACTION_TYPES.NOTE,
      });
    }
    postAction({
      verb: SAVED,
      data: {
        data: newNote,
        id: newNote.id,
      },
    });




    // dispatch for non-standalone (add remote resource)
    // dispatch(postAppInstanceResource({ data: newNote, userId }));
    // dispatch for standalone (add note in redux store)
    // dispatch(addNote({ data: newNote, _id: objectId() }));
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
              userId={note.user}
              newPageX={newPageX}
              newPageY={newPageY}
            />)) ):(<div>Add a note.</div>)
        }
        {/* backgroundImage?.uri && backgroundImage?.visible && (
          <img
            src={backgroundImage.uri}
            alt={`User selected background ${backgroundImage.name}`}
            className={classes.image}
          />
        ) */}
        {/*
        {(context?.get('permission', DEFAULT_PERMISSION) === 'write') && <Settings />}
        <ColorSettings />
        */}
      </div>
    </>
  );
};

export default Canvas;
