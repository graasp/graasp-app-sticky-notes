import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Settings from '../modes/teacher/Settings';
import ColorSettings from './ColorSettings';
import BackgroundImage from './BackgroundImage';
import { useAppSettings } from '../context/appData';
import {
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_PERMISSION,
  PERMISSION_LEVELS,
} from '../../config/settings';
import { APP_SETTINGS, CANVAS_DIMENSIONS } from '../../constants/constants';
import { Context } from '../context/ContextContext';
import NoteContainer from './NoteContainer';
import { A3_DIMENSIONS, A4_DIMENSIONS } from '../../constants/styles';

const useStyles = makeStyles(() => ({
  scrollContainer: {
    overflowX: 'scroll',
    overflowY: 'scroll',
    width: '100%',
    height: '100%',
    border: '2px solid gray',
  },
  mainContainer: {
    border: '2px solid black',
  },
  A4_container: A4_DIMENSIONS,
  A3_container: A3_DIMENSIONS,
}));

const Canvas = () => {
  const classes = useStyles();
  const [backgroundToggleSetting, setBackgroundToggleSetting] = useState(false);
  const [canvasDimensionsSelector, setCanvasDimensionsSelector] = useState(
    CANVAS_DIMENSIONS.A3,
  );
  const context = useContext(Context);

  let scrollLeft = 0;
  let scrollTop = 0;

  const [scrollPosition, setScrollPosition] = useState({
    scrollLeft,
    scrollTop,
  });
  const scrollContainer = useRef(null);

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
      setCanvasDimensionsSelector(
        appSettings?.find(({ name }) => name === APP_SETTINGS.CANVAS_DIMENSIONS)
          ?.data?.dimensions ?? CANVAS_DIMENSIONS.A3,
      );
    }
  });

  let ticking = false;

  const handleScrollEvent = () => {
    scrollLeft = scrollContainer.current?.scrollLeft;
    scrollTop = scrollContainer.current?.scrollTop;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        setScrollPosition({ scrollLeft, scrollTop });
        ticking = false;
      });
    }

    ticking = true;
  };

  const dimensions = () => {
    switch (canvasDimensionsSelector) {
      case CANVAS_DIMENSIONS.A4:
        return classes.A4_container;
      case CANVAS_DIMENSIONS.A3:
        return classes.A3_container;
      default:
        return classes.A4_container;
    }
  };

  return (
    <div
      className={classes.scrollContainer}
      ref={scrollContainer}
      onScroll={handleScrollEvent}
    >
      <div className={clsx(classes.mainContainer, dimensions())}>
        {backgroundToggleSetting ? (
          <BackgroundImage>
            <NoteContainer
              scrollLeft={scrollPosition.scrollLeft}
              scrollTop={scrollPosition.scrollTop}
            />
          </BackgroundImage>
        ) : (
          <NoteContainer
            scrollLeft={scrollPosition.scrollLeft}
            scrollTop={scrollPosition.scrollTop}
          />
        )}
        {[PERMISSION_LEVELS.WRITE, PERMISSION_LEVELS.ADMIN].includes(
          permissionLevel,
        ) && <Settings />}
        <ColorSettings />
      </div>
    </div>
  );
};

export default Canvas;
