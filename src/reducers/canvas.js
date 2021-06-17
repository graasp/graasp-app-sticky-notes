import {
  SET_ACTIVE_FORM,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE_POSITION,
} from '../types';
import { DEFAULT_NOTE_COLOR } from '../constants/constants';

const INITIAL_STATE = {
  activeForm: {
    windowDimensions: { innerHeight: 0, innerWidth: 0 },
    position: { pageX: 0, pageY: 0 },
    title: '',
    description: '',
    color: DEFAULT_NOTE_COLOR,
  },
  notes: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_ACTIVE_FORM:
      return {
        ...state,
        activeForm: payload,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, payload],
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== payload),
      };
    case UPDATE_NOTE_POSITION:
      return {
        ...state,
        notes: [
          ...state.notes.filter((note) => note.id !== payload.id),
          payload,
        ],
      };
    default:
      return state;
  }
};
