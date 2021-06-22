import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ObjectID from 'bson-objectid';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import {
  addNote,
  postAppInstanceResource,
  setActiveForm,
} from '../../../actions';
import { generateRandomRotationAngle } from '../../../utils/canvas';
import { NOTE_STRING } from '../../../constants/constants';

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
  },
}));

const FormActions = ({ height }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeForm = useSelector(({ canvas }) => canvas.activeForm);
  const userId = useSelector(({ context }) => context.userId);

  const handleDelete = () => {
    dispatch(
      setActiveForm({
        ...activeForm,
        windowDimensions: { innerHeight: 0, innerWidth: 0 },
        position: { pageX: 0, pageY: 0 },
        title: '',
        description: '',
      }),
    );
  };

  const handleConfirm = () => {
    if (activeForm.title) {
      const note = {
        ...activeForm,
        rotation: generateRandomRotationAngle(),
        type: NOTE_STRING,
      };
      dispatch(addNote({ data: note, _id: ObjectID() }));
      dispatch(postAppInstanceResource({ data: note, userId }));
      dispatch(
        setActiveForm({
          ...activeForm,
          windowDimensions: { innerHeight: 0, innerWidth: 0 },
          position: { pageX: 0, pageY: 0 },
          title: '',
          description: '',
        }),
      );
    }
  };

  return (
    <div className={classes.iconContainer} style={{ height }}>
      <DeleteIcon className={classes.formIcon} onClick={handleDelete} />
      <CheckIcon className={classes.formIcon} onClick={handleConfirm} />
    </div>
  );
};

FormActions.propTypes = {
  height: PropTypes.string.isRequired,
};

export default FormActions;
