import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

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

const EditViewActions = ({ height, onConfirm, onCancel }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  /* const { title, description, color } = useSelector(
    ({ canvas }) => canvas.noteBeingEdited.data,
  ); */

  return (
    <div className={classes.iconContainer} style={{ height }}>
      <Tooltip title={t('Cancel')}>
        <ClearIcon className={classes.formIcon} onClick={onCancel} />
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
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditViewActions;
