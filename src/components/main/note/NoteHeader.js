import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoteActions from './NoteActions';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.2vw',
    fontWeight: 600,
  },
}));

const NoteHeader = ({ title, showActions, id }) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Typography className={classes.title}>{title}</Typography>
      {showActions && <NoteActions id={id} />}
    </div>
  );
};

NoteHeader.propTypes = {
  title: PropTypes.string.isRequired,
  showActions: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default NoteHeader;
