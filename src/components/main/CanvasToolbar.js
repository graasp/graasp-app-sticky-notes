import React, { useContext, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, MUTATION_KEYS } from '../../config/queryClient';
import { CanvasContext } from '../context/CanvasContext';
import { ACTION_TYPES } from '../../config/actionTypes';
import { Button } from '@graasp/ui';

const ToolButton = styled(Button)(() => ({}));

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
      sx={{ position: 'fixed', bottom: 2, top: 2, right: 2 }}
    >
      <ToolButton onClick={deleteNote} disabled={disabled}>
        <DeleteIcon />
      </ToolButton>
    </Stack>
  );
};

CanvasToolbar.propTypes = {};

export default CanvasToolbar;
