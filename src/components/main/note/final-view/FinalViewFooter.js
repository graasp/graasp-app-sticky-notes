import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { DEFAULT_ANONYMOUS_USERNAME } from '../../../../config/settings';

const useStyles = makeStyles(() => ({
  addedBy: { fontSize: '0.4vw', color: 'grey', textAlign: 'right' },
  author: { fontWeight: 200 },
}));

const FinalViewFooter = ({ userName }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Typography className={classes.addedBy}>
      {t('Added by ')}
      <span className={classes.author}>{userName}</span>
    </Typography>
  );
};

FinalViewFooter.propTypes = {
  userName: PropTypes.string,
};

FinalViewFooter.defaultProps = {
  userName: DEFAULT_ANONYMOUS_USERNAME,
};

export default FinalViewFooter;
