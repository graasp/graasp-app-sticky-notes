/* eslint-disable jsx-a11y/click-events-have-key-events */
/* The click event is used only to prevent its propagation to the canvas. */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import { Button } from '@graasp/ui';
import Divider from '@mui/material/Divider';
import ImageUpload from './ImageUpload';
import BackgroundToggle from './BackgroundToggle';
import DownloadActions from './DownloadActions';
import { SETTINGS_BUTTON_CY, SETTINGS_CY } from '../../../config/selectors';

const StyledModal = styled(Modal)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ModalContainer = styled('div')(() => ({
  width: '50%',
  maxHeight: '70%',
  padding: 3,
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
  fontSize: '1vw',
}));

const Settings = () => {
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
          data-cy={SETTINGS_BUTTON_CY}
          color="primary"
          onClick={(event) => {
            event.stopPropagation();
            handleModalOpen();
          }}
          sx={{ bottom: 1, right: 1, position: 'fixed' }}
        >
          <SettingsIcon />
        </Fab>
        <StyledModal open={modalOpen} onClose={handleModalClose}>
          <ModalContainer data-cy={SETTINGS_CY}>
            <Typography sx={{ fontSize: '1.5vw' }}>{t('Settings')}</Typography>
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
      </div>
    </>
  );
};

export default Settings;
