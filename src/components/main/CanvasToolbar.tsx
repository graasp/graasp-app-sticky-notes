import React, { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { APP_ACTION_TYPES } from '../../config/appActionTypes';
import { useAppActionContext } from '../context/AppActionContext';
import { useAppDataContext } from '../context/AppDataContext';
import { useCanvasContext } from '../context/CanvasContext';

const CanvasToolbar = (): JSX.Element => {
  const { noteBeingTransformedId, setNoteBeingTransformedId } =
    useCanvasContext();

  const { deleteAppData } = useAppDataContext();
  const { postAppAction } = useAppActionContext();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (noteBeingTransformedId) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [noteBeingTransformedId]);

  const deleteNote = (): void => {
    if (noteBeingTransformedId) {
      deleteAppData({
        id: noteBeingTransformedId,
      });
      postAppAction({
        type: APP_ACTION_TYPES.DELETE,
        data: {
          id: noteBeingTransformedId,
        },
      });
      setNoteBeingTransformedId(null);
    }
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      spacing={2}
      bottom={0}
      top={0}
      right={0}
      position="fixed"
      component="aside"
      mr={4}
    >
      <Paper elevation={1}>
        <Stack direction="column" justifyContent="center" spacing={1}>
          <IconButton onClick={deleteNote} disabled={disabled}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Stack>
  );
};

CanvasToolbar.propTypes = {};

export default CanvasToolbar;
