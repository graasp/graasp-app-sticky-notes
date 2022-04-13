import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { MUTATION_KEYS, useMutation } from '../../../../config/queryClient';
import { ACTION_TYPES } from '../../../../config/actionTypes';
import { NOTE_ACTION_STYLE } from '../../../../constants/styles';

const useStyles = makeStyles(() => ({
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  noteAction: NOTE_ACTION_STYLE,
  noteActionHidden: {
    ...NOTE_ACTION_STYLE,
    visibility: 'hidden',
  },
}));

const FinalViewActions = ({ id, showActions }) => {
  const classes = useStyles();

  const { mutate: deleteAppData } = useMutation(MUTATION_KEYS.DELETE_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const handleDelete = () => {
    deleteAppData({
      id,
    });
    postAction({
      type: ACTION_TYPES.DELETE,
      data: { id },
    });
  };

  return (
    <div className={classes.actionContainer}>
      <DeleteIcon
        className={showActions ? classes.noteAction : classes.noteActionHidden}
        onClick={handleDelete}
      />
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
};

export default FinalViewActions;
