import React, { useContext, useEffect, useRef, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { Context, useLocalContext } from '@graasp/apps-query-client';
import { PermissionLevel } from '@graasp/sdk';

import RefreshIcon from '@mui/icons-material/Refresh';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import { APP_SETTINGS } from '../../config/constants';
import { hooks, queryClient } from '../../config/queryClient';
import { RELOAD_BUTTON_CY } from '../../config/selectors';
import {
  CANVAS_HEIGHT_PX,
  CANVAS_WIDTH_PX,
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_PERMISSION,
  ZOOM_MAX,
  ZOOM_MIN,
} from '../../config/settings';
import Settings from '../modes/teacher/Settings';
import BackgroundImage from './BackgroundImage';
import CanvasScaleControl from './CanvasScaleControl';
import ColorSettings from './ColorSettings';
import NoteContainer from './NoteContainer';

const TransformContainer = styled(TransformWrapper)(() => ({
  backgroundColor: 'white',
  width: '100%',
  height: '100%',
  border: 'none',
}));

const MainContainer = styled('div')(() => ({
  backgroundColor: 'rgba(80, 80, 210, 0.08)', // same color as selected items in lists in Graasp frontend
  // transformOrigin: '0 0',
  // flexShrink: 0,
  // position: 'relative',
}));

const Canvas = (): JSX.Element => {
  const [backgroundToggleSetting, setBackgroundToggleSetting] = useState(false);
  const context = useContext(Context);
  const localContext = useLocalContext();
  const itemId = localContext.get('itemId') || '';

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

  const renderStage = (
    scale: number,
    positionX: number,
    positionY: number,
  ): JSX.Element => (
    <NoteContainer
      scrollLeft={positionX}
      scrollTop={positionY}
      canvasScale={scale}
    />
  );

  return (
    <TransformContainer
      doubleClick={{ disabled: true }}
      minScale={ZOOM_MIN}
      maxScale={ZOOM_MAX}
    >
      {({ state: { scale, positionX, positionY }, zoomIn, zoomOut }) => (
        <>
          <TransformComponent
            wrapperStyle={{ maxWidth: '100%', maxHeight: '100%' }}
          >
            <MainContainer
              // ref={mainContainer}
              style={{
                height: `${CANVAS_HEIGHT_PX}px`,
                width: `${CANVAS_WIDTH_PX}px`,
                // transform: `scale(${canvasScale}, ${canvasScale})`,
              }}
            >
              {backgroundToggleSetting && <BackgroundImage />}
              {renderStage(scale, positionX, positionY)}
            </MainContainer>
          </TransformComponent>
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
              data-cy={RELOAD_BUTTON_CY}
            >
              <RefreshIcon />
            </Fab>
            {[PermissionLevel.Write, PermissionLevel.Admin].includes(
              permissionLevel,
            ) && <Settings />}
          </Box>
          <ColorSettings />
          <CanvasScaleControl
            canvasScale={scale}
            zoomIn={zoomIn}
            zoomOut={zoomOut}
          />
        </>
      )}
    </TransformContainer>
  );
};

export default Canvas;
