import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { editNoteTitle } from '../../../../actions';

const useStyles = makeStyles(() => ({
  container: { padding: '3%' },
  textfield: { width: '100%' },
}));

const EditViewTitle = ({ height }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { title } = useSelector(({ canvas }) => canvas.noteBeingEdited.data);

  return (
    <div style={{ height }} className={classes.container}>
      <TextField
        placeholder={t('Title')}
        className={classes.textfield}
        autoFocus
        inputProps={{ style: { fontSize: '1vw', fontWeight: 'bold' } }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{ disableUnderline: true }}
        value={title}
        onChange={(event) => dispatch(editNoteTitle(event.target.value))}
      />
    </div>
  );
};

EditViewTitle.propTypes = {
  height: PropTypes.string.isRequired,
};

export default EditViewTitle;
