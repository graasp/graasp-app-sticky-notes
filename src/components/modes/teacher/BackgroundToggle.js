import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { MUTATION_KEYS, useMutation, hooks } from '../../../config/queryClient';
import { APP_SETTINGS } from '../../../constants/constants';
import {
  DEFAULT_BACKGROUND_ENABLED,
  DEFAULT_BACKGROUND_SCALE,
} from '../../../config/settings';

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

const DEFAULT_BACKGROUND_SETTINGS = {
  name: APP_SETTINGS.BACKGROUND_SETTINGS,
  data: {
    toggle: DEFAULT_BACKGROUND_ENABLED,
    scale: DEFAULT_BACKGROUND_SCALE,
  },
};

const BackgroundToggle = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [scaleError, setScaleError] = useState(false);

  const { mutate: postAppSetting } = useMutation(
    MUTATION_KEYS.POST_APP_SETTING,
  );

  const { mutate: patchAppSetting } = useMutation(
    MUTATION_KEYS.PATCH_APP_SETTING,
  );

  const [backgroundSettings, setBackgroundSettings] = useState(null);

  const [backgroundScale, setBackgroundScale] = useState(
    DEFAULT_BACKGROUND_SCALE,
  );

  const { data: appSettings, isSuccess, isLoading } = hooks.useAppSettings();

  useEffect(() => {
    if (isSuccess) {
      const backgroundSetting = appSettings?.find(
        ({ name }) => name === APP_SETTINGS.BACKGROUND,
      );
      if (backgroundSetting) {
        const backSet =
          appSettings?.find(
            ({ name }) => name === APP_SETTINGS.BACKGROUND_SETTINGS,
          ) || DEFAULT_BACKGROUND_SETTINGS;
        setBackgroundSettings(backSet);
        setBackgroundScale(backSet?.data?.scale || DEFAULT_BACKGROUND_SCALE);
      }
    }
  }, [appSettings, isSuccess]);

  const toggleDisabled = isLoading || !backgroundSettings;

  const handleToggle = () => {
    const newBackgroundToggleSetting = {
      ...(backgroundSettings ?? DEFAULT_BACKGROUND_SETTINGS),
      data: {
        ...(backgroundSettings ?? DEFAULT_BACKGROUND_SETTINGS).data,
        toggle: Boolean(!backgroundSettings?.data?.toggle),
      },
    };
    if (backgroundSettings?.id) {
      patchAppSetting(newBackgroundToggleSetting);
    } else {
      postAppSetting({
        name: APP_SETTINGS.BACKGROUND_SETTINGS,
        data: {
          toggle: !DEFAULT_BACKGROUND_ENABLED,
        },
      });
    }
  };

  const handleScaleChange = (event) => {
    let newScaleFloat = 1.0;
    try {
      newScaleFloat = parseFloat(event.target.value);
      if (typeof newScaleFloat !== 'number') return;
    } catch (error) {
      setScaleError(true);
      return;
    }
    setBackgroundScale(newScaleFloat);
    setScaleError(false);
    if (newScaleFloat > 0.0001) {
      const newBackgroundSettings = {
        ...(backgroundSettings ?? DEFAULT_BACKGROUND_SETTINGS),
        data: {
          ...(backgroundSettings ?? DEFAULT_BACKGROUND_SETTINGS).data,
          scale: newScaleFloat,
        },
      };
      if (backgroundSettings?.id) {
        patchAppSetting(newBackgroundSettings);
      } else {
        postAppSetting(newBackgroundSettings);
      }
    } else {
      setScaleError(true);
    }
  };

  return (
    <>
      <div className={classes.toggleContainer}>
        <Typography
          className={clsx(classes.headerText, {
            [classes.headerDisabled]: toggleDisabled,
          })}
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
        />
      </div>
      <div className={classes.toggleContainer}>
        <Typography
          className={clsx(classes.headerText, {
            [classes.headerDisabled]: toggleDisabled,
          })}
        >
          {t('Scale background image')}
        </Typography>
        <FormControlLabel
          disabled={toggleDisabled}
          control={
            <TextField
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
          }
        />
      </div>
    </>
  );
};

export default BackgroundToggle;
