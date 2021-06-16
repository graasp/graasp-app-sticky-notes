import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  addedBy: { fontSize: '0.8vw', color: '#383838', textAlign: 'right' },
  author: { fontWeight: 600 },
}));

const NoteFooter = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Typography className={classes.addedBy}>
      {t('Added by ')}
      <span className={classes.author}>Anon</span>
    </Typography>
  );
};

export default NoteFooter;
