import {
  DEFAULT_MAXIMUM_ROTATION_ANGLE,
  DEFAULT_MINIMUM_ROTATION_ANGLE,
} from '../constants/constants';

/* eslint-disable import/prefer-default-export */
export const generateRandomRotationAngle = (
  minimum = DEFAULT_MINIMUM_ROTATION_ANGLE,
  maximum = DEFAULT_MAXIMUM_ROTATION_ANGLE,
) => Math.floor(Math.random() * (maximum + 1 - minimum) + minimum);
