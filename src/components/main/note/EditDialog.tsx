import { FC, useRef, useState } from 'react';
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

import { ExistingNoteTypeRecord } from '../../../config/appDataTypes';
import { AVAILABLE_COLORS } from '../../../config/constants';
import {
  CANCEL_DIALOG_CY,
  DELETE_BUTTON_IN_DIALOG_CY,
  NOTE_EDIT_DIALOG,
  QUILL_DIALOG_CY,
  SAVE_DIALOG_CY,
} from '../../../config/selectors';
import ColorItem from '../../common/ColorItem';
import NoteAvatars from '../../common/NoteAvatars';

interface EditDialogProps extends DialogProps {
  note: ExistingNoteTypeRecord['data'];
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
          <NoteAvatars userName={userName} />
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
                  key={itemColor}
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
          dataCy={DELETE_BUTTON_IN_DIALOG_CY}
          id="delete-button-in-dialog"
        >
          {t('Delete')}
        </Button>
        <div>
          <Button
            variant="text"
            color="secondary"
            onClick={onCancel}
            dataCy={CANCEL_DIALOG_CY}
          >
            {t('Cancel')}
          </Button>
          <Button
            id="save-button-in-dialog"
            onClick={() => onSave(value, color)}
            dataCy={SAVE_DIALOG_CY}
          >
            {t('Save')}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
