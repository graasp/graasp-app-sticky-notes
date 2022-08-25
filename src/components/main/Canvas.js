// Welcome
import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Settings from '../modes/teacher/Settings';
import ColorSettings from './ColorSettings';
import BackgroundImage from './BackgroundImage';
import { useAppSettings } from '../context/appData';
import {
  CANVAS_HEIGHT_PX,
  CANVAS_WIDTH_PX,
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_PERMISSION,
  PERMISSION_LEVELS,
} from '../../config/settings';
import { APP_SETTINGS } from '../../constants/constants';
import { Context } from '../context/ContextContext';
import NoteContainer from './NoteContainer';
import CanvasScaleControl from './CanvasScaleControl';
import CanvasToolbar from './CanvasToolbar';

const useStyles = makeStyles(() => ({
  scrollContainer: {
    backgroundColor: 'silver',
    overflow: 'auto',
    width: '100%',
    height: '100%',
    border: 'none',
  },
  mainContainer: {
    backgroundColor: 'white',
    // border: '2px solid black',
    transformOrigin: '0 0',
    flexShrink: 0,
    position: 'relative',
  },
}));

const Canvas = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [backgroundToggleSetting, setBackgroundToggleSetting] = useState(false);
  const context = useContext(Context);

  let scrollLeft = 0;
  let scrollTop = 0;

  const [scrollPosition, setScrollPosition] = useState({
    scrollLeft,
    scrollTop,
  });

  const [canvasScale, setCanvasScale] = useState(1);

  const scrollContainer = useRef(null);
  const mainContainer = useRef(null);
  const noteContainerRef = useRef(null);

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

  // Scroll to middle of the canvas
  useEffect(() => {
    scrollContainer.current.scrollTop =
      (mainContainer.current.clientHeight -
        scrollContainer.current.clientHeight) /
      2;
    scrollContainer.current.scrollLeft =
      (mainContainer.current.clientWidth -
        scrollContainer.current.clientWidth) /
      2;
  }, []);

  const renderStage = () => (
    <NoteContainer
      scrollLeft={scrollPosition.scrollLeft}
      scrollTop={scrollPosition.scrollTop}
      canvasScale={canvasScale}
      ref={noteContainerRef}
    />
  );

  return (
    <div
      id="scrollContainer"
      className={classes.scrollContainer}
      ref={scrollContainer}
      onScroll={handleScrollEvent}
    >
      <div
        className={classes.mainContainer}
        ref={mainContainer}
        style={{
          height: `${CANVAS_HEIGHT_PX}px`,
          width: `${CANVAS_WIDTH_PX}px`,
          transform: `scale(${canvasScale}, ${canvasScale})`,
        }}
      >
        {backgroundToggleSetting && <BackgroundImage />}
        {renderStage()}
      </div>
      <CanvasToolbar />
      {[PERMISSION_LEVELS.WRITE, PERMISSION_LEVELS.ADMIN].includes(
        permissionLevel,
      ) && <Settings />}
      <ColorSettings />
      <CanvasScaleControl
        canvasScale={canvasScale}
        setCanvasScale={setCanvasScale}
      />
    </div>
  );
};

export default Canvas;
