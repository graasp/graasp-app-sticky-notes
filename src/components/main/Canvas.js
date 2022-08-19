// Welcome
import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Settings from '../modes/teacher/Settings';
import ColorSettings from './ColorSettings';
import BackgroundImage from './BackgroundImage';
import { useAppSettings } from '../context/appData';
import {
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_CANVAS_DIMENSIONS,
  DEFAULT_PERMISSION,
  PERMISSION_LEVELS,
} from '../../config/settings';
import { APP_SETTINGS } from '../../constants/constants';
import { Context } from '../context/ContextContext';
import NoteContainer from './NoteContainer';
import CANVAS_DIMENSIONS from '../../constants/canvas_dimensions';
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
  },
}));

const Canvas = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [backgroundToggleSetting, setBackgroundToggleSetting] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [canvasDimensions, setCanvasDimensions] = useState(
    CANVAS_DIMENSIONS.get(DEFAULT_CANVAS_DIMENSIONS),
  );
  const context = useContext(Context);

  let scrollLeft = 0;
  let scrollTop = 0;

  const [scrollPosition, setScrollPosition] = useState({
    scrollLeft,
    scrollTop,
  });

  const [canvasScale, setCanvasScale] = useState();

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
      setCanvasDimensions(
        appSettings?.find(({ name }) => name === APP_SETTINGS.CANVAS_DIMENSIONS)
          ?.data ?? CANVAS_DIMENSIONS.get(DEFAULT_CANVAS_DIMENSIONS),
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

  // const [mouseX, setMouseX] = useState(0);
  // const [mouseY, setMouseY] = useState(0);

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
          height: '2160px',
          width: '4096px',
          transform: `scale(${canvasScale}, ${canvasScale})`,
        }}
        // onMouseMove={(e) => {
        //   setMouseX(scrollPosition.scrollLeft + e.clientX);
        //   setMouseY(scrollPosition.scrollTop + e.clientY);
        // }}
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
