/* eslint-disable jsx-a11y/click-events-have-key-events */

/* The click event is used only to prevent its propagation to the canvas. */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@graasp/ui';

import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { SETTINGS_BUTTON_CY, SETTINGS_CY } from '../../../config/selectors';
import BackgroundToggle from './BackgroundToggle';
import DownloadActions from './DownloadActions';
import ImageUpload from './ImageUpload';

const StyledModal = styled(Modal)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ModalContainer = styled('div')(() => ({
  width: '60%',
  maxHeight: '90%',
  padding: 10,
  backgroundColor: 'white',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflowY: 'scroll',
}));

const ButtonContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

const CloseButton = styled(Button)(() => ({
  width: '20%',
}));

const Settings = (): JSX.Element => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (): void => {
    setModalOpen(true);
  };

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  return (
    <>
      <Fab
        data-cy={SETTINGS_BUTTON_CY}
        color="primary"
        onClick={(event) => {
          event.stopPropagation();
          handleModalOpen();
        }}
      >
        <SettingsIcon />
      </Fab>
      <StyledModal
        open={modalOpen}
        onClose={handleModalClose}
        onClick={(event) => event.stopPropagation()}
      >
        <ModalContainer data-cy={SETTINGS_CY}>
          <Typography variant="h3">{t('Settings')}</Typography>
          <ImageUpload />
          <BackgroundToggle />
          <DownloadActions />
          <Divider sx={{ my: 2 }} />
          <ButtonContainer>
            <CloseButton
              variant="contained"
              color="secondary"
              onClick={handleModalClose}
            >
              {t('Close')}
            </CloseButton>
          </ButtonContainer>
        </ModalContainer>
      </StyledModal>
    </>
  );
};

export default Settings;
