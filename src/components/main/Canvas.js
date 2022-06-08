// Welcome
import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Stage } from 'react-konva';
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
import { queryClient, QueryClientProvider } from '../../config/queryClient';
import { CanvasContext } from '../context/CanvasContext';
import { TokenContext } from '../context/TokenContext';
import CanvasToolbar from './CanvasToolbar';

const useStyles = makeStyles(() => ({
  scrollContainer: {
    overflowX: 'scroll',
    overflowY: 'scroll',
    width: '100%',
    height: '100%',
    border: '2px solid gray',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainContainer: {
    border: '2px solid black',
    flexShrink: 0,
  },
}));

const Canvas = () => {
  const classes = useStyles();
  const [backgroundToggleSetting, setBackgroundToggleSetting] = useState(false);
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
  const mainStage = useRef(null);

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

  const renderStage = () => (
    <CanvasContext.Consumer>
      {(value) => (
        <TokenContext.Consumer>
          {(valueToken) => (
            <Context.Consumer>
              {(valueContext) => (
                <Stage
                  width={mainContainer.current?.clientWidth}
                  height={mainContainer.current?.clientHeight}
                  onClick={(e) => {
                    noteContainerRef.current?.click(e, mainStage.current);
                  }}
                  ref={mainStage}
                >
                  <QueryClientProvider client={queryClient}>
                    <Context.Provider value={valueContext}>
                      <TokenContext.Provider value={valueToken}>
                        <CanvasContext.Provider value={value}>
                          <NoteContainer
                            scrollLeft={scrollPosition.scrollLeft}
                            scrollTop={scrollPosition.scrollTop}
                            canvasScale={canvasScale}
                            ref={noteContainerRef}
                          />
                        </CanvasContext.Provider>
                      </TokenContext.Provider>
                    </Context.Provider>
                  </QueryClientProvider>
                </Stage>
              )}
            </Context.Consumer>
          )}
        </TokenContext.Consumer>
      )}
    </CanvasContext.Consumer>
  );

  return (
    <div
      className={classes.scrollContainer}
      ref={scrollContainer}
      onScroll={handleScrollEvent}
    >
      <div
        className={classes.mainContainer}
        ref={mainContainer}
        style={{
          height: canvasDimensions.height,
          width: canvasDimensions.width,
          transform: `scale(${canvasScale}, ${canvasScale})`,
        }}
      >
        {backgroundToggleSetting ? (
          <BackgroundImage>{renderStage()}</BackgroundImage>
        ) : (
          renderStage()
        )}
      </div>
      {[PERMISSION_LEVELS.WRITE, PERMISSION_LEVELS.ADMIN].includes(
        permissionLevel,
      ) && <Settings />}
      <ColorSettings />
      <CanvasToolbar />
      <CanvasScaleControl
        canvasScale={canvasScale}
        setCanvasScale={setCanvasScale}
      />
    </div>
  );
};

export default Canvas;
