import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import { makeStyles } from '@material-ui/core/styles';
import 'react-quill/dist/quill.bubble.css';
import PropTypes from 'prop-types';
import './note_style.css';

const useStyles = makeStyles(() => ({
  editingArea: {
    width: '100%',
    height: '100%',
  },
}));

// eslint-disable-next-line no-unused-vars
const EditableTextInput = forwardRef(({ value, onChange, onKeyDown }, ref) => {
  const textInput = useRef();

  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();

  const modules = {
    toolbar: [
      // [{ 'header': [1, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'link',
  ];

  const focusOnText = () => {
    textInput.current.focus();
  };

  useImperativeHandle(ref, () => ({
    focus: focusOnText,
  }));

  return (
    <ReactQuill
      theme="bubble"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      ref={textInput}
      modules={modules}
      formats={formats}
    />
    /* <div className={classes.editingArea}/>
    </ReactQuill> */
  );
});

EditableTextInput.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default EditableTextInput;
