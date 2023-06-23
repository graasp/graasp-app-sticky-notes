import { List } from 'immutable';

import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';

import { APP_DATA_TYPES, ExistingNoteType } from '../../config/appDataTypes';
import { BACKDROP_INSTRUCTIONS_CY } from '../../config/selectors';
import { useAppDataContext } from '../context/AppDataContext';

const InstructionsBackdrop: FC = () => {
  const { t } = useTranslation();
  const [showBackdrop, setShowBackdrop] = useState(true);

  const { appDataArray: appData } = useAppDataContext();

  const handleCloseBackdrop = (): void => {
    setShowBackdrop(false);
  };

  useEffect(() => {
    const notes = appData.filter(
      ({ type }) => type === APP_DATA_TYPES.NOTE,
    ) as unknown as List<ExistingNoteType>;
    if (notes && !notes.isEmpty()) {
      setShowBackdrop(false);
    }
  }, [appData]);

  return (
    <Backdrop
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={showBackdrop}
      onClick={handleCloseBackdrop}
    >
      <Typography
        data-cy={BACKDROP_INSTRUCTIONS_CY}
        variant="h3"
        textAlign="center"
      >
        {t('INSTRUCTIONS_ADD_NOTE')}
      </Typography>
    </Backdrop>
  );
};

export default InstructionsBackdrop;
