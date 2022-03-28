import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { MAX_LENGTH_TITLE } from '../../../../config/settings';

const useStyles = makeStyles(() => ({
  container: { padding: '3%' },
  textfield: { width: '100%' },
}));

const EditViewTitle = ({ height, title, onChange }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [text, setText] = useState(title);

  return (
    <div style={{ height }} className={classes.container}>
      <TextField
        placeholder={t('Title')}
        className={classes.textfield}
        autoFocus
        inputProps={{
          style: { fontSize: '1vw', fontWeight: 'bold' },
          maxLength: MAX_LENGTH_TITLE,
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{ disableUnderline: true }}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          onChange(event.target.value);
        }}
      />
    </div>
  );
};

EditViewTitle.propTypes = {
  height: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditViewTitle;
