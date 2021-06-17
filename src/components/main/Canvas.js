import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ObjectID from 'bson-objectid';
import Form from './form/Form';
import Note from './note/Note';
import { setActiveForm, addNote } from '../../actions';
import { generateRandomRotationAngle } from '../../utils/canvas';

const useStyles = makeStyles(() => ({
  mainContainer: { width: '100%', height: '100%', cursor: 'pointer' },
  image: { width: '100%', height: '100%', display: 'block' },
}));

const Canvas = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { activeForm, notes } = useSelector(({ canvas }) => canvas);
  const activeFormExists = !!activeForm.position.pageX;

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
      dispatch(
        addNote({
          ...activeForm,
          rotation: generateRandomRotationAngle(),
          id: ObjectID(),
        }),
      );
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
      {notes.map((note, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Note note={note} key={index} />
      ))}
      {activeFormExists && <Form />}
      <img
        src="https://images.unsplash.com/photo-1527245592484-dff09c8e4cd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
        alt="user selected background"
        className={classes.image}
      />
    </div>
  );
};

export default Canvas;
