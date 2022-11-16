import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import DoneIcon from '@mui/icons-material/Done';
import { Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import './note_style.css';

interface EditableTextInputProps {
  value: string;
  onChange: (t: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export type EditableTextInputRefType = {
  focus: () => void;
};

const EditableTextInput = forwardRef<
  EditableTextInputRefType,
  EditableTextInputProps
>((props: EditableTextInputProps, ref) => {
  const { value, onChange, onKeyDown } = props;
  const textInput = useRef<ReactQuill>(null);

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

  const focus = (): void => {
    textInput.current?.focus();
  };

  useImperativeHandle(ref, () => ({
    focus,
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

EditableTextInput.displayName = 'EditableTextInput';

export default EditableTextInput;
