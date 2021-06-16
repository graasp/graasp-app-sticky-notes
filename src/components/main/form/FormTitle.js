import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { setActiveForm } from '../../../actions';

const useStyles = makeStyles(() => ({
  container: { padding: '3%' },
  textfield: { width: '100%' },
}));

const FormTitle = ({ height }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeForm = useSelector(({ canvas }) => canvas.activeForm);

  return (
    <div style={{ height }} className={classes.container}>
      <TextField
        placeholder={t('Title (Required)')}
        className={classes.textfield}
        autoFocus
        inputProps={{ style: { fontSize: '1vw', fontWeight: 'bold' } }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{ disableUnderline: true }}
        value={activeForm.title}
        onChange={(event) =>
          dispatch(setActiveForm({ ...activeForm, title: event.target.value }))
        }
      />
    </div>
  );
};

FormTitle.propTypes = {
  height: PropTypes.string.isRequired,
};

export default FormTitle;
