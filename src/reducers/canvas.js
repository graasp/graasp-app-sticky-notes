import {
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE_POSITION,
  SET_USER_NOTE_COLOR,
  SET_NOTE_BEING_EDITED,
  EDIT_NOTE_COLOR,
  EDIT_NOTE_TITLE,
  EDIT_NOTE_DESCRIPTION,
  CLEAR_NOTE_BEING_EDITED,
} from '../types';
import { DEFAULT_NOTE_COLOR } from '../constants/constants';

const INITIAL_STATE = {
  notes: [],
  userSetColor: DEFAULT_NOTE_COLOR,
  noteBeingEdited: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, payload],
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes.filter((note) => note._id !== payload._id),
          payload,
        ],
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== payload),
      };
    case UPDATE_NOTE_POSITION:
      return {
        ...state,
        notes: [
          ...state.notes.filter((note) => note._id !== payload._id),
          payload,
        ],
      };
    case SET_USER_NOTE_COLOR:
      return {
        ...state,
        userSetColor: payload,
      };
    case SET_NOTE_BEING_EDITED:
      return {
        ...state,
        noteBeingEdited: { ...state.noteBeingEdited, ...payload },
      };
    case EDIT_NOTE_COLOR:
      return {
        ...state,
        noteBeingEdited: {
          ...state.noteBeingEdited,
          data: { ...state.noteBeingEdited.data, color: payload },
        },
      };
    case EDIT_NOTE_TITLE:
      return {
        ...state,
        noteBeingEdited: {
          ...state.noteBeingEdited,
          data: { ...state.noteBeingEdited.data, title: payload },
        },
      };
    case EDIT_NOTE_DESCRIPTION:
      return {
        ...state,
        noteBeingEdited: {
          ...state.noteBeingEdited,
          data: { ...state.noteBeingEdited.data, description: payload },
        },
      };
    case CLEAR_NOTE_BEING_EDITED:
      return { ...state, noteBeingEdited: {} };
    default:
      return state;
  }
};
