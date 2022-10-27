import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@graasp/ui';
import { saveAs } from 'file-saver';
import { hooks } from '../../../config/queryClient';
import { showErrorToast } from '../../../utils/toasts';
import { Context } from '@graasp/apps-query-client';

const ToggleContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

const DownloadActions = () => {
  const { t } = useTranslation();

  const [actions, setActions] = useState([]);

  const [enableDownload, setEnableDownload] = useState(false);

  const context = useContext(Context);

  const {
    data: appActions,
    isSuccess: isAppActionsSuccess,
    isError: isAppActionsError,
  } = hooks.useAppActions();

  const errorMsg = t('The app actions could not be loaded.');
  useEffect(() => {
    if (isAppActionsError) {
      showErrorToast(errorMsg);
      setEnableDownload(false);
      return;
    }
    if (isAppActionsSuccess && !appActions?.isEmpty()) {
      setActions(appActions);
      setEnableDownload(true);
    }
  }, [appActions, isAppActionsSuccess, isAppActionsError, errorMsg]);

  const handleDownload = () => {
    const datetime = new Date().toJSON();

    const blob = new Blob(
      [
        JSON.stringify({
          context: {
            ...Object.fromEntries(context),
            datetime,
          },
          actions,
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
            disabled={!enableDownload}
            variant="contained"
            color="secondary"
            onClick={handleDownload}
          >
            {t('Download')}
          </Button>
        }
      />
    </ToggleContainer>
  );
};

export default DownloadActions;
