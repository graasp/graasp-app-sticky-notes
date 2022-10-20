import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { AVAILABLE_COLORS } from '../../constants/constants';
import { CanvasContext } from '../context/CanvasContext';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: 'fixed',
    top: theme.spacing(1),
    right: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fab: {
    marginBottom: theme.spacing(1),
  },
  colorSettingsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  color: {
    width: '2vw',
    height: '2vw',
    cursor: 'pointer',
    borderRadius: '50%',
    background: 'darkgreen',
    marginBottom: theme.spacing(1),
  },
}));

const ColorSettings = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { userSetColor, setUserSetColor } = useContext(CanvasContext);
  const [colorPaletteOpen, setColorPaletteOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setColorPaletteOpen(!colorPaletteOpen);
  };

  return (
    <div className={classes.mainContainer}>
      <Tooltip title={t('Set new note color')} placement="left" arrow>
        <Fab
          className={classes.fab}
          size="small"
          onClick={handleClick}
          color="primary"
        >
          {colorPaletteOpen ? <MoreHorizIcon /> : <MoreVertIcon />}
        </Fab>
      </Tooltip>
      {colorPaletteOpen && (
        <div className={classes.colorSettingsContainer}>
          {AVAILABLE_COLORS.map((color) => (
            <>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div
                style={{
                  background: color,
                  border: userSetColor === color && '1px solid grey',
                }}
                className={classes.color}
                key={color}
                onClick={(event) => {
                  event.stopPropagation();
                  setUserSetColor(color);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.stopPropagation();
                    setUserSetColor(color);
                  }
                }}
              />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSettings;
