import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import HealingIcon from '@material-ui/icons/Healing';
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
            <Classifier category='gain_creators' emitCategory={emitCategory}>
                <TrendingUpIcon />
            </Classifier>
            <Classifier category='product_services' emitCategory={emitCategory}>
                <RoomServiceIcon />
            </Classifier>
            <Classifier category='pain_relievers' emitCategory={emitCategory}>
                <HealingIcon />
            </Classifier>
        </div>
        <div>
            <Classifier category='gains' emitCategory={emitCategory}>
                <TrendingUpIcon />
            </Classifier>
            <Classifier category='pains' emitCategory={emitCategory}>
                <TrendingUpIcon />
            </Classifier>
            <Classifier category='customer-jobs' emitCategory={emitCategory}>
                <TrendingUpIcon />
            </Classifier>
        </div>
    </div>
  );
};

VPC.propTypes = {
    emitCategory: PropTypes.func.isRequired,
}

export default VPC;