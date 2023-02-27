import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactZoomPanPinchHandlers } from 'react-zoom-pan-pinch';

import FitScreenIcon from '@mui/icons-material/FitScreen';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { styled } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { ZOOM_STEP } from '../../config/settings';

const MainContainer = styled('div')(() => ({
  position: 'fixed',
  bottom: 2,
  left: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '20%',
  width: '20%',
  maxHeight: '20%',
}));

interface CanvasScaleControlInterface {
  canvasScale: number;
  zoomIn: ReactZoomPanPinchHandlers['zoomIn'];
  zoomOut: ReactZoomPanPinchHandlers['zoomOut'];
  zoomReset: () => void;
}

const CanvasScaleControl = (
  props: CanvasScaleControlInterface,
): JSX.Element => {
  const { canvasScale, zoomIn, zoomOut, zoomReset } = props;
  const { t } = useTranslation();

  const getAriaLabel = (): string => `${Math.floor(100 * canvasScale)}%`;

  const zoomTooltip = (child: JSX.Element): JSX.Element => (
    <Tooltip title={`${getAriaLabel()} zoom`}>{child}</Tooltip>
  );

  return (
    <MainContainer>
      <ButtonGroup
        color="primary"
        variant="contained"
        size="large"
        aria-label={getAriaLabel()}
      >
        {zoomTooltip(
          <IconButton
            color="primary"
            aria-label={t('ZOOM_IN')}
            onClick={() => zoomIn(ZOOM_STEP)}
          >
            <ZoomInIcon />
          </IconButton>,
        )}
        <Tooltip title={t('RESET_VIEW')}>
          <IconButton
            color="primary"
            aria-label={t('ZOOM_IN')}
            onClick={() => zoomReset()}
          >
            <FitScreenIcon />
          </IconButton>
        </Tooltip>
        {zoomTooltip(
          <IconButton
            color="primary"
            aria-label={t('ZOOM_OUT')}
            onClick={() => zoomOut(ZOOM_STEP)}
          >
            <ZoomOutIcon />
          </IconButton>,
        )}
      </ButtonGroup>
    </MainContainer>
  );
};

export default CanvasScaleControl;
