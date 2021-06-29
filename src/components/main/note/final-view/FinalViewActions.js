import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  deleteAppInstanceResource,
  deleteNote,
  patchAppInstanceResource,
  setNoteBeingEdited,
  updateNote,
} from '../../../../actions';

const useStyles = makeStyles(() => ({
  actionContainer: { display: 'flex', alignItems: 'center' },
  noteAction: {
    color: '#383838',
    fontSize: '1.1vw',
    cursor: 'pointer',
  },
}));

const FinalViewActions = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { standalone } = useSelector(({ context }) => context);
  const { notes: sessionNotes } = useSelector(({ canvas }) => canvas);
  const savedNotes = useSelector(
    ({ appInstanceResources }) => appInstanceResources.content,
  );
  const notes = standalone ? sessionNotes : savedNotes;
  const noteBeingEdited = useSelector(({ canvas }) => canvas.noteBeingEdited);

  const handleDelete = () => {
    dispatch(deleteAppInstanceResource(id));
    dispatch(deleteNote(id));
  };

  const handleEdit = () => {
    // if the edit button is clicked when another note is in edit mode, update that note and take it out of edit mode
    if (noteBeingEdited._id) {
      const updatedData = {
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
      );
    }
    const noteToBeEdited = notes.find((note) => note._id === id);
    dispatch(setNoteBeingEdited({ ...noteToBeEdited }));
  };

  return (
    <div className={classes.actionContainer}>
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
};

export default FinalViewActions;
