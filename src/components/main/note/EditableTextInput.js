import PropTypes from 'prop-types';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import DoneIcon from '@mui/icons-material/Done';
import { Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import './note_style.css';

const EditableTextInput = forwardRef(({ value, onChange, onKeyDown }, ref) => {
  const textInput = useRef();

  const modules = {
    toolbar: [
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
    textInput.current?.focus();
  };

  useImperativeHandle(ref, () => ({
    focus: focusOnText,
  }));

  return (
    <Stack direction="row" justifyContent="space-between">
      <ReactQuill
        theme="bubble"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={textInput}
        modules={modules}
        formats={formats}
      />
      <Container>
        <IconButton>
          <DoneIcon />
        </IconButton>
      </Container>
    </Stack>
  );
});

EditableTextInput.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default EditableTextInput;
