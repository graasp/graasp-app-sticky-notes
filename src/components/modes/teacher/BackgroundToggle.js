import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { MUTATION_KEYS, useMutation } from '../../../config/queryClient';
import { Context } from '../../context/ContextContext';

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

const BackgroundToggle = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { mutate: patchSettings } = useMutation(MUTATION_KEYS.PATCH_SETTINGS);
  const context = useContext(Context);
  const backgroundImage = context?.get('settings')?.backgroundImage;

  const toggleDisabled = !backgroundImage?.uri;

  const handleToggle = () => {
    patchSettings({
      backgroundImage: {
        name: backgroundImage?.name,
        uri: backgroundImage?.uri,
        visible: !backgroundImage?.visible,
      },
    });
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
            checked={backgroundImage?.visible ?? false}
            onChange={handleToggle}
          />
        }
      />
    </div>
  );
};

export default BackgroundToggle;
