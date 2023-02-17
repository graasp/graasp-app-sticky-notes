import { saveAs } from 'file-saver';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { useLocalContext } from '@graasp/apps-query-client';
import { Button } from '@graasp/ui';

import { styled } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import { useAppActionContext } from '../../context/AppActionContext';

const ToggleContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

const DownloadActions = (): JSX.Element => {
  const { t } = useTranslation();

  const context = useLocalContext();

  const { appActionArray } = useAppActionContext();

  const handleDownload = (): void => {
    const datetime = new Date().toJSON();

    const blob = new Blob(
      [
        JSON.stringify({
          context: {
            ...Object.fromEntries(context),
            datetime,
          },
          appActionArray,
        }),
      ],
      {
        type: 'text/json;charset=utf-8',
      },
    );
    const filename = `app_actions_${datetime}.json`;
    saveAs(blob, filename);
  };

  return (
    <ToggleContainer>
      <Typography sx={{ fontSize: '1.1em' }}>
        {t('Download learning analytics.')}
      </Typography>
      <FormControlLabel
        control={
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDownload}
          >
            {t('Download')}
          </Button>
        }
        label={undefined}
      />
    </ToggleContainer>
  );
};

export default DownloadActions;
