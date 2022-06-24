/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
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
  toolsList: {
    // border: 'solid',
    // borderRadius: '1em',
    // borderColor: theme.palette.primary.main,
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

const CanvasToolbar = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { noteBeingTransformedId, setNoteBeingTransformedId } =
    useContext(CanvasContext);

  const { mutate: deleteAppData } = useMutation(MUTATION_KEYS.DELETE_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const deleteNote = () => {
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
  };

  return (
    <div className={classes.mainContainer}>
      <List className={classes.toolsList}>
        {/* <ListItem button>
          <ListItemIcon className={classes.tool}>
          <InsertPhotoIcon
            onClick={console.log('Insert photo.')} />
          </ListItemIcon>
    </ListItem> */}
        <ListItem button>
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
