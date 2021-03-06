import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { MAX_LENGTH_TITLE } from '../../../../config/settings';
import { SMALL_DELAY_REFOCUS_MS } from '../../../../constants/constants';

const useStyles = makeStyles(() => ({
  container: { padding: '3%' },
  textfield: { width: '100%' },
}));

const EditViewTitle = ({ height, title, onChange, onEnter }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [text, setText] = useState(title);

  const textInput = useRef(null);

  const focusOnText = () => {
    textInput.current.focus();
  };

  return (
    <div style={{ height }} className={classes.container}>
      <TextField
        placeholder={t('Title')}
        className={classes.textfield}
        autoFocus
        inputProps={{
          style: { fontSize: '1vw' },
          maxLength: MAX_LENGTH_TITLE,
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{ disableUnderline: true }}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          onChange(event.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter();
          }
        }}
        inputRef={textInput}
        onBlur={() => {
          setTimeout(focusOnText, SMALL_DELAY_REFOCUS_MS); // Need a small delay before refocusing.
        }}
      />
    </div>
  );
};

EditViewTitle.propTypes = {
  height: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
};

export default EditViewTitle;
