/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  deleteAppInstanceResource,
  deleteNote,
  setActiveForm,
} from '../../../actions';

const useStyles = makeStyles(() => ({
  actionContainer: { display: 'flex', alignItems: 'center' },
  noteAction: {
    color: '#383838',
    fontSize: '1.1vw',
    cursor: 'pointer',
  },
}));

const NoteActions = ({ id }) => {
  const standalone = useSelector(({ context }) => context.standalone);
  const { notes: sessionNotes } = useSelector(({ canvas }) => canvas);
  const savedNotes = useSelector(
    ({ appInstanceResources }) => appInstanceResources.content,
  );
  const notesToDisplay = standalone ? sessionNotes : savedNotes;

  const [currentNote] = notesToDisplay.filter((note) => note._id === id);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAppInstanceResource(id));
    dispatch(deleteNote(id));
  };

  const handleEdit = () => {
    dispatch(setActiveForm({ ...currentNote.data }));
    dispatch(deleteAppInstanceResource(id));
    dispatch(deleteNote(id));
  };

  return (
    <div className={classes.actionContainer}>
      <EditIcon className={classes.noteAction} onClick={handleEdit} />
      <DeleteIcon className={classes.noteAction} onClick={handleDelete} />
    </div>
  );
};

NoteActions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default NoteActions;
