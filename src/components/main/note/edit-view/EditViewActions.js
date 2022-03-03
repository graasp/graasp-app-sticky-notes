/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import {
  clearNoteBeingEdited,
  patchAppInstanceResource,
  updateNote,
} from '../../../../actions';
import { useMutation, MUTATION_KEYS } from '../../../../config/queryClient';

const useStyles = makeStyles(() => ({
  iconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  formIcon: {
    color: '#484848',
    textAlign: 'right',
    fontSize: '1.1vw',
    marginRight: '5px',
    cursor: 'pointer',
  },
}));

const EditViewActions = ({ height, note, id, onConfirm, onCancel }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  /* const { title, description, color } = useSelector(
    ({ canvas }) => canvas.noteBeingEdited.data,
  ); */
  const { title, description, color } = useState(null);

  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);

  const handleCancel = () => {
    // dispatch(clearNoteBeingEdited());
  };

  const handleConfirm = () => {
    const updatedNote = {
      ...note,
      title,
      description,
      color,
    };
    
    // dispatch for standalone cases
    // dispatch(updateNote({ data: updatedNote, _id: id }));
    // dispatch for non-standalone cases
    // dispatch(patchAppInstanceResource({ id, data: updatedNote }));

    patchAppData({
      data: updatedNote.data,
      id: updatedNote._id,
    });

    // dispatch(clearNoteBeingEdited());
  };

  return (
    <div className={classes.iconContainer} style={{ height }}>
      <Tooltip title={t('Cancel')}>
        <ClearIcon className={classes.formIcon} onClick={onCancel()} />
      </Tooltip>
      <Tooltip title={t('Save')}>
        <CheckIcon className={classes.formIcon} onClick={onConfirm} />
      </Tooltip>
    </div>
  );
};

EditViewActions.propTypes = {
  height: PropTypes.string.isRequired,
  note: PropTypes.shape({
    windowDimensions: PropTypes.shape({
      innerHeight: PropTypes.number.isRequired,
      innerWidth: PropTypes.number.isRequired,
    }),
    position: PropTypes.shape({
      pageX: PropTypes.number.isRequired,
      pageY: PropTypes.number.isRequired,
    }),
    color: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    rotation: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditViewActions;
