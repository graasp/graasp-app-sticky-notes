import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ObjectID from 'bson-objectid';
import Form from './form/Form';
import Note from './note/Note';
import {
  setActiveForm,
  addNote,
  postAppInstanceResource,
  getAppInstanceResources,
} from '../../actions';
import { generateRandomRotationAngle } from '../../utils/canvas';
import Settings from '../modes/teacher/Settings';
import { RE_FETCH_INTERVAL } from '../../constants/constants';
import { TEACHER_MODE } from '../../config/settings';

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

  // extract required state from redux store
  const { mode, standalone } = useSelector(({ context }) => context);
  const { activeForm, notes: sessionNotes } = useSelector(
    ({ canvas }) => canvas,
  );
  const savedNotes = useSelector(
    ({ appInstanceResources }) => appInstanceResources.content,
  );
  const { backgroundImage } = useSelector(
    ({ appInstance }) => appInstance.content.settings,
  );
  const userId = useSelector(({ context }) => context.userId);

  // if session is standalone, show sessionNotes; if not, show notes retrieved from API
  const notesToDisplay = standalone ? sessionNotes : savedNotes;
  const activeFormExists = !!activeForm.position.pageX;

  useEffect(() => {
    // fetch app instance resources once on app initialization
    dispatch(getAppInstanceResources());
    // subsequently fetch them every RE_FETCH_INTERVAL, so that different clients remain in sync
    setInterval(() => {
      dispatch(getAppInstanceResources());
    }, RE_FETCH_INTERVAL);
  }, []);

  // main click handler in application
  const handleCanvasClick = (event) => {
    const { innerHeight, innerWidth } = window;
    const { pageX, pageY } = event;
    if (!activeFormExists || (activeFormExists && !activeForm.title)) {
      dispatch(
        setActiveForm({
          ...activeForm,
          windowDimensions: { innerHeight, innerWidth },
          position: { pageX, pageY },
        }),
      );
    } else if (activeFormExists && activeForm.title) {
      const note = {
        ...activeForm,
        rotation: generateRandomRotationAngle(),
      };
      dispatch(addNote({ data: note, _id: ObjectID() }));
      dispatch(postAppInstanceResource({ data: note, userId }));
      dispatch(
        setActiveForm({
          ...activeForm,
          title: '',
          description: '',
          windowDimensions: { innerHeight, innerWidth },
          position: { pageX, pageY },
        }),
      );
    }
  };

  return (
    <div
      className={classes.mainContainer}
      onClick={handleCanvasClick}
      onDragOver={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      {notesToDisplay.map((note) => (
        <Note
          note={note.data}
          id={note._id}
          key={note._id}
          userId={note.user}
        />
      ))}
      {activeFormExists && <Form />}
      {backgroundImage?.uri && (
        <img
          src={backgroundImage.uri}
          alt={`User selected background ${backgroundImage.name}`}
          className={classes.image}
        />
      )}
      {mode === TEACHER_MODE && <Settings />}
    </div>
  );
};

export default Canvas;
