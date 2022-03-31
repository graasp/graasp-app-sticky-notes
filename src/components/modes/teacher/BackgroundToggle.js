import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { MUTATION_KEYS, useMutation } from '../../../config/queryClient';
import { APP_SETTINGS } from '../../../constants/constants';
import { useAppSettings } from '../../context/appData';
import { DEFAULT_BACKGROUND_ENABLED } from '../../../config/settings';

const useStyles = makeStyles(() => ({
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    fontSize: '1.05vw',
  },
  headerDisabled: {
    color: 'grey',
  },
}));

const DEFAULT_BACKGROUND_TOGGLE = {
  name: APP_SETTINGS.BACKGROUND_TOGGLE,
  data: {
    toggle: DEFAULT_BACKGROUND_ENABLED,
  }
};

const BackgroundToggle = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { mutate: postAppSetting } = useMutation(
    MUTATION_KEYS.POST_APP_SETTING,
  );

  const { mutate: patchAppSetting } = useMutation(
    MUTATION_KEYS.PATCH_APP_SETTING,
  );

  const [ backgroundToggleSetting, setBackgroundToggleSetting ] = useState(null);
  
  const { data: appSettings, isSuccess, isLoading } = useAppSettings();

  useEffect(() => {
    if(isSuccess) {
      const backgroundSetting = appSettings?.find(
        ({ name }) => name === APP_SETTINGS.BACKGROUND,
      );
      if(backgroundSetting){
        setBackgroundToggleSetting(appSettings?.find(
          ({ name }) => name === APP_SETTINGS.BACKGROUND_TOGGLE,
        ) || DEFAULT_BACKGROUND_TOGGLE);
      }
    }
  }, [appSettings, isSuccess]);

  const toggleDisabled = isLoading || (backgroundToggleSetting === null);

  const handleToggle = () => {
    const newBackgroundToggleSetting = {
      ...(backgroundToggleSetting ?? DEFAULT_BACKGROUND_TOGGLE),
      data: {
        toggle: Boolean(!backgroundToggleSetting?.data?.toggle),
      },
    };
    if(backgroundToggleSetting?.id) {
      patchAppSetting(newBackgroundToggleSetting);
    } else {
      postAppSetting(newBackgroundToggleSetting);
    }
  };

  return (
    <div className={classes.toggleContainer}>
      <Typography
        className={`classes.headerText ${
          toggleDisabled && classes.headerDisabled
        }`}
      >
        {t('Show Background Image')}
      </Typography>
      <FormControlLabel
        disabled={toggleDisabled}
        control={
          <Switch
            color="primary"
            checked={backgroundToggleSetting?.data?.toggle || DEFAULT_BACKGROUND_ENABLED}
            onChange={handleToggle}
          />
        }
      />
    </div>
  );
};

export default BackgroundToggle;
