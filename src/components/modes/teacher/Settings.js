/* eslint-disable jsx-a11y/click-events-have-key-events */
/* The click event is used only to prevent its propagation to the canvas. */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import { Button } from '@graasp/ui';
import Divider from '@material-ui/core/Divider';
import ImageUpload from './ImageUpload';
import BackgroundToggle from './BackgroundToggle';
import DownloadActions from './DownloadActions';
import SelectCanvasSize from './SelectCanvasSize';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '50%',
    maxHeight: '70%',
    padding: theme.spacing(3),
    backgroundColor: 'white',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'scroll',
  },
  header: {
    fontSize: '1.5vw',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeButton: {
    width: '20%',
    fontSize: '1vw',
  },
}));

const Settings = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div onClick={(event) => event.stopPropagation()}>
        <Fab
          id='settings-button'
          color="primary"
          className={classes.fab}
          onClick={(event) => {
            event.stopPropagation();
            handleModalOpen();
          }}
        >
          <SettingsIcon />
        </Fab>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          className={classes.modal}
        >
          <div
            id='settings'
            className={classes.modalContainer}>
            <Typography className={classes.header}>{t('Settings')}</Typography>
            <ImageUpload />
            <BackgroundToggle />
            <DownloadActions />
            <SelectCanvasSize />
            <Divider className={classes.divider} />
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleModalClose}
                className={classes.closeButton}
              >
                {t('Close')}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Settings;
