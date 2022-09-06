import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation, MUTATION_KEYS } from '../../config/queryClient';
import { CanvasContext } from '../context/CanvasContext';
import { ACTION_TYPES } from '../../config/actionTypes';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: 'fixed',
    bottom: theme.spacing(2),
    top: theme.spacing(2),
    right: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tool: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    width: '3.5em',
    height: '3.5em',
  },
  toolIcon: {
    color: 'white',
  },
}));

const CanvasToolbar = () => {
  const classes = useStyles();

  const { noteBeingTransformedId, setNoteBeingTransformedId } =
    useContext(CanvasContext);

  const { mutate: deleteAppData } = useMutation(MUTATION_KEYS.DELETE_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (noteBeingTransformedId) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [noteBeingTransformedId]);

  const deleteNote = () => {
    if (noteBeingTransformedId) {
      deleteAppData({
        id: noteBeingTransformedId,
      });
      postAction({
        type: ACTION_TYPES.DELETE,
        data: {
          id: noteBeingTransformedId,
        },
      });
      setNoteBeingTransformedId(null);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <List className={classes.toolsList}>
        <ListItem button disabled={disabled}>
          <ListItemIcon className={classes.tool}>
            <DeleteIcon className={classes.toolIcon} onClick={deleteNote} />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
};

CanvasToolbar.propTypes = {};

export default CanvasToolbar;
