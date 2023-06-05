import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';

import { AVAILABLE_COLORS } from '../../config/constants';
import ColorItem from '../common/ColorItem';
import { useCanvasContext } from '../context/CanvasContext';

const MainContainer = styled('div')(() => ({
  position: 'fixed',
  top: 1,
  right: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ColorSettingsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const ColorSettings = (): JSX.Element => {
  const { t } = useTranslation();
  const { userSetColor, setUserSetColor } = useCanvasContext();
  const [colorPaletteOpen, setColorPaletteOpen] = useState(false);

  const handleClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    setColorPaletteOpen(!colorPaletteOpen);
  };

  return (
    <MainContainer>
      <Tooltip title={t('Set new note color')} placement="left" arrow>
        <Fab size="small" onClick={handleClick} color="primary" sx={{ m: 1 }}>
          {colorPaletteOpen ? <MoreHorizIcon /> : <MoreVertIcon />}
        </Fab>
      </Tooltip>
      {colorPaletteOpen && (
        <ColorSettingsContainer>
          {AVAILABLE_COLORS.map((itemColor) => (
            <>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <ColorItem
                selectedColor={userSetColor}
                itemColor={itemColor}
                setColor={setUserSetColor}
              />
            </>
          ))}
        </ColorSettingsContainer>
      )}
    </MainContainer>
  );
};

export default ColorSettings;
