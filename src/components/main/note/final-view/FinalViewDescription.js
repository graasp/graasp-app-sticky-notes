import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  description: { fontSize: '1vw', overflow: 'auto' },
}));

const FinalViewDescription = ({ description }) => {
  const classes = useStyles();

  return <Typography className={classes.description}>{description}</Typography>;
};

FinalViewDescription.propTypes = {
  description: PropTypes.string,
};

FinalViewDescription.defaultProps = {
  description: '',
};

export default FinalViewDescription;
