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

const FormDescription = ({ height }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeForm = useSelector(({ canvas }) => canvas.activeForm);

  return (
    <div style={{ height }} className={classes.container}>
      <TextField
        placeholder={t('Description')}
        className={classes.textfield}
        inputProps={{ style: { fontSize: '1vw' } }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{ disableUnderline: true }}
        multiline
        rows={2}
        value={activeForm.description}
        onChange={(event) =>
          dispatch(
            setActiveForm({ ...activeForm, description: event.target.value }),
          )
        }
      />
    </div>
  );
};

FormDescription.propTypes = {
  height: PropTypes.string.isRequired,
};

export default FormDescription;
