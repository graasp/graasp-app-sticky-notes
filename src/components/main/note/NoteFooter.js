import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { getUsers } from '../../../actions';

const useStyles = makeStyles(() => ({
  addedBy: { fontSize: '0.8vw', color: '#383838', textAlign: 'right' },
  author: { fontWeight: 600 },
}));

const NoteFooter = ({ userId }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const standalone = useSelector(({ context }) => context.standalone);
  const usersArray = useSelector(({ users }) => users.content);

  // if app is accessed standalone, don't show any information in the footer (where user info is displayed)
  // a typography element is still rendered for visual consistency
  if (standalone) {
    return <Typography className={classes.addedBy} />;
  }

  const userName =
    usersArray.find((user) => user.id === userId)?.name || t('Anonymous');

  return (
    <Typography className={classes.addedBy}>
      {t('Added by ')}
      <span className={classes.author}>{userName}</span>
    </Typography>
  );
};

NoteFooter.propTypes = {
  userId: PropTypes.string,
};

NoteFooter.defaultProps = {
  userId: null,
};

export default NoteFooter;
