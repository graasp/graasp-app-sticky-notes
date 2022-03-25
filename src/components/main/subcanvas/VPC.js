import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MoodIcon from '@material-ui/icons/Mood';
import Classifier from '../classify/Classifier';

const useStyles = makeStyles(() => ({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
}));

const VPC = ({emitCategory}) => {
  const classes = useStyles();
  
  return (
    <div className={classes.mainContainer}>
        <div>
            <Classifier category='pains' emitCategory={emitCategory}>
                <MoodIcon />
            </Classifier>
            <Classifier category='gains' emitCategory={emitCategory}>
                <MoodIcon />
            </Classifier>
            <Classifier category='customer-jobs' emitCategory={emitCategory}>
                <MoodIcon />
            </Classifier>
        </div>
    </div>
  );
};

VPC.propTypes = {
    emitCategory: PropTypes.func.isRequired,
}

export default VPC;