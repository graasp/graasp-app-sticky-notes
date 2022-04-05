import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Settings from '../modes/teacher/Settings';
import ColorSettings from './ColorSettings';
import BackgroundImage from './BackgroundImage';
import { useAppSettings } from '../context/appData';
import {
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_PERMISSION,
  PERMISSION_LEVELS,
} from '../../config/settings';
import { APP_SETTINGS } from '../../constants/constants';
import { Context } from '../context/ContextContext';
import NoteContainer from './NoteContainer';

const useStyles = makeStyles(() => ({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
}));

const Canvas = () => {
  const classes = useStyles();
  const [backgroundToggleSetting, setBackgroundToggleSetting] = useState(false);
  const context = useContext(Context);

  const permissionLevel = context?.get('permission', DEFAULT_PERMISSION);

  const { data: appSettings, isSuccess } = useAppSettings();

  useEffect(() => {
    if (isSuccess) {
      setBackgroundToggleSetting(
        Boolean(
          appSettings?.find(
            ({ name }) => name === APP_SETTINGS.BACKGROUND_TOGGLE,
          )?.data?.toggle ?? DEFAULT_BACKGROUND_ENABLED,
        ),
      );
    }
  });

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={classes.mainContainer}>
        {backgroundToggleSetting ? (
          <BackgroundImage>
            <NoteContainer />
          </BackgroundImage>
        ) : (
          <NoteContainer />
        )}
        {(permissionLevel === PERMISSION_LEVELS.WRITE ||
          permissionLevel === PERMISSION_LEVELS.ADMIN) && <Settings />}
        <ColorSettings />
      </div>
    </>
  );
};

export default Canvas;
