import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import MinimizeIcon from '@material-ui/icons/Remove';
// import MaximizeIcon from '@material-ui/icons/Add';
// import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
// import CanvasContext from '../../../context/CanvasContext';
import { MUTATION_KEYS, useMutation } from '../../../../config/queryClient';
import { ACTION_TYPES } from '../../../../config/actionTypes';

const noteAction = {
  color: '#383838',
  fontSize: '0.8vw',
  cursor: 'pointer',
};

const useStyles = makeStyles(() => ({
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  noteAction,
  noteActionHidden: {
    ...noteAction,
    visibility: 'hidden',
  }
}));

const FinalViewActions = ({ id, showActions /* , minimized, onChangeMinimize */}) => {
  const classes = useStyles();
  // const { setNoteBeingEditedId } = useContext(CanvasContext);
  
  const { mutate: deleteAppData } = useMutation(MUTATION_KEYS.DELETE_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  /* const handleMinimize = () => {
    onChangeMinimize(true);
  };

  const handleMaximize = () => {
    onChangeMinimize(false);
  }; */

  const handleDelete = () => {
    deleteAppData({
      id,
    });
    postAction({
      type: ACTION_TYPES.DELETE,
      data: { id },
    });
  };

  // const handleEdit = () => {
  //   // if the edit button is clicked when another note is in edit mode, update that note and take it out of edit mode
  //   // TODO: implement this behaviour.
  //   /* if (noteBeingEditedId) {
  //     console.log('Save note');
  //   } */
  //   setNoteBeingEditedId(id);
  // };

  return (
    <div className={classes.actionContainer}>
      {/* minimized ? (
        <MaximizeIcon className={classes.noteAction} onClick={handleMaximize} />
      ) : (
        <MinimizeIcon className={classes.noteAction} onClick={handleMinimize} />
      ) */}
      {/* <EditIcon className={classes.noteAction} onClick={handleEdit} /> */}
      <DeleteIcon className={showActions ? classes.noteAction : classes.noteActionHidden} onClick={handleDelete} />
    </div>
  );
};

FinalViewActions.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  showActions: PropTypes.bool.isRequired,
  // minimized: PropTypes.bool.isRequired,
  // onChangeMinimize: PropTypes.func.isRequired,
};

export default FinalViewActions;
