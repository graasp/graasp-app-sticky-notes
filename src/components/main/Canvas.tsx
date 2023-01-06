import React, { useContext, useEffect, useRef, useState } from 'react';

import { Context, useLocalContext } from '@graasp/apps-query-client';
import { PermissionLevel } from '@graasp/sdk';

import RefreshIcon from '@mui/icons-material/Refresh';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import { APP_SETTINGS } from '../../config/constants';
import { hooks, queryClient } from '../../config/queryClient';
import { SCROLL_CONTAINER_CY } from '../../config/selectors';
import {
  CANVAS_HEIGHT_PX,
  CANVAS_WIDTH_PX,
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_PERMISSION,
} from '../../config/settings';
import Settings from '../modes/teacher/Settings';
import BackgroundImage from './BackgroundImage';
import CanvasScaleControl from './CanvasScaleControl';
import CanvasToolbar from './CanvasToolbar';
import ColorSettings from './ColorSettings';
import NoteContainer from './NoteContainer';

const ScrollContainer = styled('div')(() => ({
  backgroundColor: 'white',
  overflow: 'auto',
  width: '100%',
  height: '100%',
  border: 'none',
}));

const MainContainer = styled('div')(() => ({
  backgroundColor: 'rgba(80, 80, 210, 0.08)', // same color as selected items in lists in Graasp frontend
  transformOrigin: '0 0',
  flexShrink: 0,
  position: 'relative',
}));

const Canvas = (): JSX.Element => {
  const [backgroundToggleSetting, setBackgroundToggleSetting] = useState(false);
  const context = useContext(Context);
  const localContext = useLocalContext();
  const itemId = localContext.get('itemId') || '';

  const [scrollPosition, setScrollPosition] = useState({
    scrollLeft: 0,
    scrollTop: 0,
  });

  const [canvasScale, setCanvasScale] = useState(1);

  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const mainContainer = useRef<HTMLDivElement | null>(null);

  const permissionLevel =
    (context?.get('permission') as PermissionLevel) || DEFAULT_PERMISSION;

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

  const handleScrollEvent = (): void => {
    const scrollLeft = scrollContainer.current?.scrollLeft || 0;
    const scrollTop = scrollContainer.current?.scrollTop || 0;

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
        (mainContainer.current?.clientHeight ||
          0 - scrollContainer.current.clientHeight) / 2;
      scrollContainer.current.scrollLeft =
        (mainContainer.current?.clientWidth ||
          0 - scrollContainer.current.clientWidth) / 2;
    }
  }, []);

  const renderStage = (): JSX.Element => (
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
      <Box
        sx={{
          bottom: 1,
          right: 1,
          position: 'fixed',
          '& > :not(style)': { m: 1 },
        }}
      >
        <Fab
          color="primary"
          size="small"
          onClick={() => {
            queryClient.invalidateQueries([itemId]);
          }}
        >
          <RefreshIcon />
        </Fab>
        {[PermissionLevel.Write, PermissionLevel.Admin].includes(
          permissionLevel,
        ) && <Settings />}
      </Box>
      <ColorSettings />
      <CanvasScaleControl
        canvasScale={canvasScale}
        setCanvasScale={setCanvasScale}
      />
    </ScrollContainer>
  );
};

export default Canvas;
