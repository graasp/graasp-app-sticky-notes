import React, { useContext, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { useMutation, MUTATION_KEYS } from '../../config/queryClient';
import { CanvasContext } from '../context/CanvasContext';
import { ACTION_TYPES } from '../../config/actionTypes';

const CanvasToolbar = () => {
  const { noteBeingTransformedId, setNoteBeingTransformedId } =
    useContext(CanvasContext);

  const { mutate: deleteAppData } = useMutation(MUTATION_KEYS.DELETE_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (noteBeingTransformedId) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [noteBeingTransformedId]);

  const deleteNote = () => {
    if (noteBeingTransformedId) {
      deleteAppData({
        id: noteBeingTransformedId,
      });
      postAction({
        type: ACTION_TYPES.DELETE,
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
