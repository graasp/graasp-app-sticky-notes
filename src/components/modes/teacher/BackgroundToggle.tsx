import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';

import { BackgroundSettingsType } from '../../../config/appSettingTypes';
import { APP_SETTINGS } from '../../../config/constants';
import {
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_BACKGROUND_SCALE,
} from '../../../config/settings';
import { useAppSettingContext } from '../../context/AppSettingContext';

const ToggleContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

const DEFAULT_BACKGROUND_SETTINGS = {
  name: APP_SETTINGS.BACKGROUND_SETTINGS,
  data: {
    toggle: DEFAULT_BACKGROUND_ENABLED,
    scale: DEFAULT_BACKGROUND_SCALE,
  },
};

const BackgroundToggle = (): JSX.Element => {
  const { t } = useTranslation();

  const [scaleError, setScaleError] = useState(false);
  const [toggleDisabled, setToggleDisabled] = useState<boolean>(true);

  const {
    appSettingArray: settings,
    postAppSetting,
    patchAppSetting,
  } = useAppSettingContext();

  const [backgroundSettings, setBackgroundSettings] =
    useState<BackgroundSettingsType>();

  const [backgroundScale, setBackgroundScale] = useState(
    DEFAULT_BACKGROUND_SCALE,
  );

  useEffect(() => {
    const backgroundSetting = settings?.find(
      ({ name }) => name === APP_SETTINGS.BACKGROUND,
    );
    if (backgroundSetting) {
      const backSet = settings?.find(
        ({ name }) => name === APP_SETTINGS.BACKGROUND_SETTINGS,
      ) as BackgroundSettingsType;
      setBackgroundSettings(backSet);
      setBackgroundScale(backSet?.data?.scale || DEFAULT_BACKGROUND_SCALE);
      setToggleDisabled(false);
    }
  }, [settings]);

  const handleToggle = (): void => {
    if (backgroundSettings?.id) {
      const newBackgroundToggleSetting = {
        ...backgroundSettings,
        data: {
          ...backgroundSettings.data,
          toggle: Boolean(!backgroundSettings.data.toggle),
        },
      };
      patchAppSetting(newBackgroundToggleSetting);
    } else {
      postAppSetting({
        ...DEFAULT_BACKGROUND_SETTINGS,
        data: {
          toggle: !DEFAULT_BACKGROUND_ENABLED,
        },
      });
    }
  };

  const handleScaleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    let newScaleFloat = 1.0;
    try {
      newScaleFloat = parseFloat(event.target?.value);
      if (typeof newScaleFloat !== 'number') return;
    } catch (error) {
      setScaleError(true);
      return;
    }
    setBackgroundScale(newScaleFloat);
    setScaleError(false);
    if (newScaleFloat > 0.0001) {
      if (backgroundSettings?.id) {
        const newBackgroundSettings = {
          ...backgroundSettings,
          data: {
            ...backgroundSettings.data,
            scale: newScaleFloat,
          },
        };
        patchAppSetting(newBackgroundSettings);
      } else {
        postAppSetting({
          ...DEFAULT_BACKGROUND_SETTINGS,
          data: {
            scale: newScaleFloat,
          },
        });
      }
    } else {
      setScaleError(true);
    }
  };

  return (
    <>
      <ToggleContainer>
        <Typography
          fontSize="1.1em"
          color={toggleDisabled ? grey[500] : 'black'}
        >
          {t('Show Background Image')}
        </Typography>
        <FormControlLabel
          disabled={toggleDisabled}
          control={
            <Switch
              color="primary"
              checked={
                backgroundSettings?.data?.toggle ?? DEFAULT_BACKGROUND_ENABLED
              }
              onChange={handleToggle}
            />
          }
          label={undefined}
        />
      </ToggleContainer>
      <ToggleContainer>
        <Typography
          fontSize="1.1em"
          color={toggleDisabled ? grey[500] : 'black'}
        >
          {t('Scale background image')}
        </Typography>
        <TextField
          disabled={toggleDisabled}
          value={backgroundScale}
          error={scaleError}
          color="primary"
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            max: 40,
            min: 0.1,
            step: 0.1,
          }}
          onChange={handleScaleChange}
        />
      </ToggleContainer>
    </>
  );
};

export default BackgroundToggle;
