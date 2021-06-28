/* eslint-disable import/prefer-default-export */
import { ADD_IMAGE } from '../types';

const addImage = (payload) => (dispatch) =>
  dispatch({
    type: ADD_IMAGE,
    payload,
  });

export { addImage };
