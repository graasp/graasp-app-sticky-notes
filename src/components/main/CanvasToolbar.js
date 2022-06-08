/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation, MUTATION_KEYS } from '../../config/queryClient';
import { CanvasContext } from '../context/CanvasContext';
import { ACTION_TYPES } from '../../config/actionTypes';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: 'fixed',
    bottom: theme.spacing(2),
    top: theme.spacing(2),
    left: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',   
  },
  sliderStyle: {
    width: '80%',
  },
}));

const CanvasToolbar = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    noteBeingTransformedId,
    setNoteBeingTransformedId,
  } = useContext(CanvasContext);

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
      <List>
      <ListItem button>
          <ListItemIcon>
          <DeleteIcon
            onClick={deleteNote} />
          </ListItemIcon>
    </ListItem>
      </List>
    </div>
  );
};

CanvasToolbar.propTypes = {
};

export default CanvasToolbar;
