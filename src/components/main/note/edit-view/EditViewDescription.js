import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  container: { padding: '3%' },
  textfield: { width: '100%' },
}));

const EditViewDescription = ({ height, description, onChange }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [text, setText] = useState(description);

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
        value={text}
        onChange={
          (event) => {
            setText(event.target.value);
            onChange(event.target.value);
          }
        }
      />
    </div>
  );
};

EditViewDescription.propTypes = {
  height: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditViewDescription;
