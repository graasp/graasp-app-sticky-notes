import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@graasp/ui';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import {
  CANCEL_DELETE_BUTTON_CY,
  CONFIRM_DELETE_BUTTON_CY,
  CONFIRM_DELETE_DIALOG_CY,
} from '../../../config/selectors';

interface DeleteConfirmDialogProps extends DialogProps {
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteConfirmDialog: FC<DeleteConfirmDialogProps> = ({
  open,
  onCancel,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onCancel} data-cy={CONFIRM_DELETE_DIALOG_CY}>
      <DialogContent>
        <DialogContentText>{t('CONFIRM_DELETE')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          color="secondary"
          onClick={onCancel}
          dataCy={CANCEL_DELETE_BUTTON_CY}
        >
          {t('Cancel')}
        </Button>
        <Button
          color="error"
          onClick={onDelete}
          endIcon={<DeleteOutlinedIcon />}
          dataCy={CONFIRM_DELETE_BUTTON_CY}
        >
          {t('Delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
