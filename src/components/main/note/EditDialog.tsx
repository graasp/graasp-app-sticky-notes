import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Button } from '@graasp/ui';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Stack, Typography } from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { NoteDataType } from '../../../config/appDataTypes';
import { AVAILABLE_COLORS } from '../../../config/constants';
import {
  DELETE_BUTTON_IN_DIALOG_CY,
  NOTE_EDIT_DIALOG,
  QUILL_DIALOG_CY,
} from '../../../config/selectors';
import ColorItem from '../../common/ColorItem';

interface EditDialogProps extends DialogProps {
  note: NoteDataType;
  userName: string;
  onCancel: () => void;
  onSave: (text: string, color?: string) => void;
  onDelete: () => void;
}

const EditDialog: FC<EditDialogProps> = ({
  note,
  userName,
  open,
  onCancel,
  onSave,
  onDelete,
}) => {
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
    <Dialog open={open} fullWidth maxWidth="md" data-cy={NOTE_EDIT_DIALOG}>
      <DialogTitle>{t('Edit note')}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Typography variant="subtitle2">
            {t('ADDED_BY_TEXT', { userName })}
          </Typography>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            ref={textInput}
            modules={modules}
            formats={formats}
            data-cy={QUILL_DIALOG_CY}
            id="quill-dialog"
          />
          <Stack direction="row" spacing={1}>
            <Typography variant="caption">{t('Note color:')}</Typography>
            {AVAILABLE_COLORS.map((itemColor) => (
              <>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <ColorItem
                  selectedColor={color}
                  itemColor={itemColor}
                  setColor={setColor}
                />
              </>
            ))}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button
          color="error"
          onClick={onDelete}
          endIcon={<DeleteOutlinedIcon />}
          data-cy={DELETE_BUTTON_IN_DIALOG_CY} // TODO: fix this. It doesn't work for testing...
          id="delete-button-in-dialog"
        >
          {t('Delete')}
        </Button>
        <div>
          <Button variant="text" color="secondary" onClick={onCancel}>
            {t('Cancel')}
          </Button>
          <Button
            id="save-button-in-dialog"
            onClick={() => onSave(value, color)}
          >
            {t('Save')}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
