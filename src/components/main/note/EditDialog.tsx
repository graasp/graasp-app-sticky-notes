import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Button } from '@graasp/ui';

import { Stack, Typography, styled } from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { NoteDataType } from '../../../config/appDataTypes';
import { AVAILABLE_COLORS } from '../../../config/constants';

const Color = styled('div')(() => ({
  width: '1.5vw',
  height: '1.5vw',
  cursor: 'pointer',
  borderRadius: '50%',
  background: 'darkgreen',
  marginBottom: 1,
}));

interface EditDialogProps extends DialogProps {
  note: NoteDataType;
  userName: string;
  onCancel: () => void;
  onSave: (text: string, color?: string) => void;
}

const EditDialog = (props: EditDialogProps): JSX.Element => {
  const { note, userName, open, onCancel, onSave } = props;
  const { t } = useTranslation();
  const { text, color: initialColor } = note;

  const textInput = useRef<ReactQuill | null>(null);
  const [value, setValue] = useState<string>(text);
  const [color, setColor] = useState<string>(initialColor);
  const onChange = (s: string): void => setValue(s);
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

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle>{t('Edit note')}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Typography variant="subtitle2">
            {`${t('Added by:')} ${userName}`}
          </Typography>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            ref={textInput}
            modules={modules}
            formats={formats}
          />
          <Stack direction="row" spacing={1}>
            <Typography variant="caption">{t('Note color:')}</Typography>
            {AVAILABLE_COLORS.map((colorItem) => (
              <>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <Color
                  sx={{
                    background: colorItem,
                    border: color === colorItem ? '1px solid grey' : 'none',
                  }}
                  key={color}
                  onClick={(event) => {
                    event.stopPropagation();
                    setColor(colorItem);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.stopPropagation();
                      setColor(colorItem);
                    }
                  }}
                />
              </>
            ))}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="secondary" onClick={onCancel}>
          {t('Cancel')}
        </Button>
        <Button
          onClick={() => onSave(value, color)}
        >
          {t('Save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
