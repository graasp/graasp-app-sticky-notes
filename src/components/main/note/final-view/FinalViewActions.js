/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MinimizeIcon from '@material-ui/icons/Remove';
import MaximizeIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CanvasContext from '../../../context/CanvasContext';
import {
  deleteAppInstanceResource,
  deleteNote,
  patchAppInstanceResource,
  setNoteBeingEdited,
  updateNote,
} from '../../../../actions';
import { MUTATION_KEYS, useMutation } from '../../../../config/queryClient';

const useStyles = makeStyles(() => ({
  actionContainer: { display: 'flex', alignItems: 'center' },
  noteAction: {
    color: '#383838',
    fontSize: '1.1vw',
    cursor: 'pointer',
  },
}));

const FinalViewActions = ({ id, minimized, onChangeMinimize }) => {
  const classes = useStyles();
//  const dispatch = useDispatch();
//  const { standalone } = useSelector(({ context }) => context);
//  const { notes: sessionNotes } = useSelector(({ canvas }) => canvas);
  /* const savedNotes = useSelector(
    ({ appInstanceResources }) => appInstanceResources.content,
  ); */
//  const notes = standalone ? sessionNotes : savedNotes;
//  const currentNote = notes.find((note) => note._id === id);
//  const isMinimized = currentNote.data.minimized;
  // const noteBeingEdited = useSelector(({ canvas }) => canvas.noteBeingEdited);
  const { noteBeingEditedId, setNoteBeingEditedId } = useContext(CanvasContext);
  
  const { mutate: deleteAppData } = useMutation(MUTATION_KEYS.DELETE_APP_DATA);

  const handleMinimize = () => {
    onChangeMinimize(true);
  };

  const handleMaximize = () => {
    onChangeMinimize(false);
  };

  const handleDelete = () => {
    deleteAppData({
      id,
    });
  };

  const handleEdit = () => {
    // if the edit button is clicked when another note is in edit mode, update that note and take it out of edit mode
    if (noteBeingEditedId) {
      /* const updatedData = {
        ...noteBeingEdited.data,
        title: noteBeingEdited.data.title,
        description: noteBeingEdited.data.description,
        color: noteBeingEdited.data.color,
      };

      dispatch(
        patchAppInstanceResource({
          id: noteBeingEdited._id,
          data: updatedData,
        }),
      );

      dispatch(
        updateNote({
          _id: noteBeingEdited._id,
          data: updatedData,
        }),
      ); */
      console.log('Save note');
    }
    // dispatch(setNoteBeingEdited({ ...currentNote }));
    setNoteBeingEditedId(id);
  };

  return (
    <div className={classes.actionContainer}>
      {minimized ? (
        <MaximizeIcon className={classes.noteAction} onClick={handleMaximize} />
      ) : (
        <MinimizeIcon className={classes.noteAction} onClick={handleMinimize} />
      )}
      <EditIcon className={classes.noteAction} onClick={handleEdit} />
      <DeleteIcon className={classes.noteAction} onClick={handleDelete} />
    </div>
  );
};

FinalViewActions.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  minimized: PropTypes.bool.isRequired,
  onChangeMinimize: PropTypes.func.isRequired,
};

export default FinalViewActions;
