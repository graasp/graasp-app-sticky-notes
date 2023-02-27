import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { Context, useLocalContext } from '@graasp/apps-query-client';
import { PermissionLevel } from '@graasp/sdk';

import RefreshIcon from '@mui/icons-material/Refresh';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';

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
}));

const Canvas = (): JSX.Element => {
  const { t } = useTranslation();
  const [backgroundToggleSetting, setBackgroundToggleSetting] = useState(false);
  const context = useContext(Context);
  const localContext = useLocalContext();
  const itemId = localContext.get('itemId') || '';

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
      centerOnInit
    >
      {({
        state: { scale, positionX, positionY },
        zoomIn,
        zoomOut,
        centerView,
      }) => (
        <>
          <TransformComponent
            wrapperStyle={{ maxWidth: '100%', maxHeight: '100%' }}
          >
            <MainContainer
              style={{
                height: `${CANVAS_HEIGHT_PX}px`,
                width: `${CANVAS_WIDTH_PX}px`,
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
            <Tooltip title={t('REFRESH')}>
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
            </Tooltip>
            {[PermissionLevel.Write, PermissionLevel.Admin].includes(
              permissionLevel,
            ) && <Settings />}
          </Box>
          <ColorSettings />
          <CanvasScaleControl
            canvasScale={scale}
            zoomIn={zoomIn}
            zoomOut={zoomOut}
            zoomReset={() => centerView(1)}
          />
        </>
      )}
    </TransformContainer>
  );
};

export default Canvas;
