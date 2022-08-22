import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

const EditableTextInput = forwardRef(({ value, onChange, onKeyDown }, ref) => {
  const textInput = useRef();

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
      theme="snow"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      ref={textInput}
      modules={modules}
      formats={formats}
    />
  );
});

EditableTextInput.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default EditableTextInput;
