import { ADD_IMAGE } from '../types';

const INITIAL_STATE = {
  addedImage: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD_IMAGE:
      return {
        ...state,
        addedImage: payload,
      };
    default:
      return state;
  }
};
