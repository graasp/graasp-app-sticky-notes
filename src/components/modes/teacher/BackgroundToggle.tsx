import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';

import { BackgroundSettingsTypeRecord } from '../../../config/appSettingTypes';
import { APP_SETTINGS } from '../../../config/constants';
import { DEFAULT_BACKGROUND_ENABLED } from '../../../config/settings';
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
  },
};

const BackgroundToggle = (): JSX.Element => {
  const { t } = useTranslation();
  const [toggleDisabled, setToggleDisabled] = useState<boolean>(true);

  const {
    appSettingArray: settings,
    postAppSetting,
    patchAppSetting,
  } = useAppSettingContext();

  const [backgroundSettings, setBackgroundSettings] =
    useState<BackgroundSettingsTypeRecord>();

  useEffect(() => {
    const backgroundSetting = settings?.find(
      ({ name }) => name === APP_SETTINGS.BACKGROUND,
    );
    if (backgroundSetting) {
      const backSet = settings?.find(
        ({ name }) => name === APP_SETTINGS.BACKGROUND_SETTINGS,
      ) as BackgroundSettingsTypeRecord;
      setBackgroundSettings(backSet);
      setToggleDisabled(false);
    }
  }, [settings]);

  const handleToggle = (): void => {
    if (backgroundSettings?.id) {
      const newBackgroundToggleSetting = backgroundSettings.setIn(
        ['data', 'toggle'],
        Boolean(!backgroundSettings.data.toggle),
      );
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

  return (
    <ToggleContainer>
      <Typography fontSize="1.1em" color={toggleDisabled ? grey[500] : 'black'}>
        {t('Show Background Image')}
      </Typography>
      <Switch
        disabled={toggleDisabled}
        color="primary"
        checked={backgroundSettings?.data?.toggle ?? DEFAULT_BACKGROUND_ENABLED}
        onChange={handleToggle}
      />
    </ToggleContainer>
  );
};

export default BackgroundToggle;
