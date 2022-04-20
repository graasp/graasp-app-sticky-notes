import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@graasp/ui';
import { saveAs } from 'file-saver';
import { useAppActions } from '../../context/appData';
import { showErrorToast } from '../../../utils/toasts';

const useStyles = makeStyles(() => ({
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    fontSize: '1.05vw',
  },
}));

const DownloadActions = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [actions, setActions] = useState([]);

  const [enableDownload, setEnableDownload] = useState(false);

  const {
    data: appActions,
    isSuccess: isAppActionsSuccess,
    isError: isAppActionsError,
  } = useAppActions();

  useEffect(() => {
    if (isAppActionsError) {
      showErrorToast(t('The app actions could not be loaded.'));
      setEnableDownload(false);
      return;
    }
    if (isAppActionsSuccess && !appActions?.isEmpty()) {
      setActions(appActions);
      setEnableDownload(true);
    }
  }, [appActions, isAppActionsSuccess, isAppActionsError]);

  const handleDownload = () => {
    // The filename should be improved.
    const blob = new Blob([JSON.stringify(actions)], {
      type: 'text/json;charset=utf-8',
    });
    saveAs(blob, 'app_actions.json');
  };

  return (
    <div className={classes.toggleContainer}>
      <Typography className={classes.headerText}>
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
    </div>
  );
};

export default DownloadActions;
