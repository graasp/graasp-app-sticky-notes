import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MinimizeIcon from '@material-ui/icons/Remove';
import MaximizeIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { CanvasContext } from '../../../context/CanvasContext';
import { MUTATION_KEYS, useMutation } from '../../../../config/queryClient';
import { ACTION_TYPES } from '../../../../config/actionTypes';

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
  const { setNoteBeingEditedId } = useContext(CanvasContext);

  const { mutate: deleteAppData } = useMutation(MUTATION_KEYS.DELETE_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

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
    postAction({
      type: ACTION_TYPES.DELETE,
      data: { id },
    });
  };

  const handleEdit = () => {
    // if the edit button is clicked when another note is in edit mode, update that note and take it out of edit mode
    // TODO: Eventually implement that...
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
