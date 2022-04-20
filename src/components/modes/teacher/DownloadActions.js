import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@graasp/ui';
import { saveAs } from 'file-saver';
import { useAppActions } from '../../context/appData';
import { showErrorToast } from '../../../utils/toasts';
import { Context } from '../../context/ContextContext';

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

  const context = useContext(Context);

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
