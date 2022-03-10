import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { Context } from '../../../context/ContextContext';

const useStyles = makeStyles(() => ({
  addedBy: { fontSize: '0.8vw', color: '#383838', textAlign: 'right' },
  author: { fontWeight: 600 },
}));

const FinalViewFooter = ({ userId }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const context = useContext(Context);

  
  // eslint-disable-next-line react/destructuring-assignment
  const members = context?.get('members') ?? [];

  console.log(members);

  // const standalone = useSelector(({ context }) => context.standalone);
  // const usersArray = useSelector(({ users }) => users.content); // TODO: Port this

  // if app is accessed standalone, don't show any information in the footer (where user info is displayed)
  // a typography element is still rendered for visual consistency
  /* if (standalone) {
    return <Typography className={classes.addedBy} />;
  } */

  const userName = userId;
  //  usersArray.find((user) => user.id === userId)?.name || t('Anonymous');

  return (
    <Typography className={classes.addedBy}>
      {t('Added by ')}
      <span className={classes.author}>{userName}</span>
    </Typography>
  );
};

FinalViewFooter.propTypes = {
  userId: PropTypes.string,
};

FinalViewFooter.defaultProps = {
  userId: null,
};

export default FinalViewFooter;
