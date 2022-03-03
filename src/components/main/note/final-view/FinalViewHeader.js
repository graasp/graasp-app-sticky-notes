import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FinalViewActions from './FinalViewActions';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.1vw',
    fontWeight: 600,
    overflowWrap: 'anywhere'
  },
}));

const FinalViewHeader = ({ title, description, color, showActions, id, minimized, onChangeMinimize}) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Typography className={classes.title}>{title}</Typography>
      {showActions && (
        <FinalViewActions
          id={id}
          description={description}
          title={title}
          color={color}
          minimized={minimized}
          onChangeMinimize={onChangeMinimize}
        />
      )}
    </div>
  );
};

FinalViewHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string, // .isRequired,
  showActions: PropTypes.bool.isRequired,
  minimized: PropTypes.bool.isRequired,
  onChangeMinimize: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

FinalViewHeader.defaultProps = {
  title: '',
  description: '',
  color: '#DFD59F',
};

export default FinalViewHeader;
