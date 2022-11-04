import React, { useContext, useEffect, useRef, useState } from 'react';

import { Context } from '@graasp/apps-query-client';

import { styled } from '@mui/material';

import { hooks } from '../../config/queryClient';
import { SCROLL_CONTAINER_CY } from '../../config/selectors';
import {
  CANVAS_HEIGHT_PX,
  CANVAS_WIDTH_PX,
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_PERMISSION,
  PERMISSION_LEVELS,
} from '../../config/settings';
import { APP_SETTINGS } from '../../constants/constants';
import Settings from '../modes/teacher/Settings';
import BackgroundImage from './BackgroundImage';
import CanvasScaleControl from './CanvasScaleControl';
import CanvasToolbar from './CanvasToolbar';
import ColorSettings from './ColorSettings';
import NoteContainer from './NoteContainer';

const ScrollContainer = styled('div')(() => ({
  backgroundColor: 'silver',
  overflow: 'auto',
  width: '100%',
  height: '100%',
  border: 'none',
}));

const MainContainer = styled('div')(() => ({
  backgroundColor: 'white',
  transformOrigin: '0 0',
  flexShrink: 0,
  position: 'relative',
}));

const Canvas = () => {
  const [backgroundToggleSetting, setBackgroundToggleSetting] = useState(false);
  const context = useContext(Context);

  const [scrollPosition, setScrollPosition] = useState({
    scrollLeft: 0,
    scrollTop: 0,
  });

  const [canvasScale, setCanvasScale] = useState(1);

  const scrollContainer = useRef(null);
  const mainContainer = useRef(null);

  const permissionLevel = context?.get('permission', DEFAULT_PERMISSION);

  const { data: appSettings, isSuccess } = hooks.useAppSettings();

  useEffect(() => {
    if (isSuccess) {
      const backgroundSettings = appSettings?.find(
        ({ name }) => name === APP_SETTINGS.BACKGROUND_SETTINGS,
      );
      const toggle = Boolean(
        backgroundSettings?.data?.toggle ?? DEFAULT_BACKGROUND_ENABLED,
      );
      setBackgroundToggleSetting(toggle);
    }
  }, [isSuccess, appSettings]);

  let ticking = false;

  const handleScrollEvent = () => {
    const scrollLeft = scrollContainer.current?.scrollLeft;
    const scrollTop = scrollContainer.current?.scrollTop;

    // Avoid the change of the state to happen more often than the redrawing of the screen.
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
    if (scrollContainer.current) {
      scrollContainer.current.scrollTop =
        (mainContainer.current.clientHeight -
          scrollContainer.current.clientHeight) /
        2;
      scrollContainer.current.scrollLeft =
        (mainContainer.current.clientWidth -
          scrollContainer.current.clientWidth) /
        2;
    }
  }, []);

  const renderStage = () => (
    <NoteContainer
      scrollLeft={scrollPosition.scrollLeft}
      scrollTop={scrollPosition.scrollTop}
      canvasScale={canvasScale}
    />
  );

  return (
    <ScrollContainer
      data-cy={SCROLL_CONTAINER_CY}
      ref={scrollContainer}
      onScroll={handleScrollEvent}
    >
      <MainContainer
        ref={mainContainer}
        style={{
          height: `${CANVAS_HEIGHT_PX}px`,
          width: `${CANVAS_WIDTH_PX}px`,
          transform: `scale(${canvasScale}, ${canvasScale})`,
        }}
      >
        {backgroundToggleSetting && <BackgroundImage />}
        {renderStage()}
      </MainContainer>
      <CanvasToolbar />
      {[PERMISSION_LEVELS.WRITE, PERMISSION_LEVELS.ADMIN].includes(
        permissionLevel,
      ) && <Settings />}
      <ColorSettings />
      <CanvasScaleControl
        canvasScale={canvasScale}
        setCanvasScale={setCanvasScale}
      />
    </ScrollContainer>
  );
};

export default Canvas;
