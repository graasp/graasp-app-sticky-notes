import {
  SET_ACTIVE_FORM,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE_POSITION,
} from '../types';

const setActiveForm = (payload) => (dispatch) =>
  dispatch({
    type: SET_ACTIVE_FORM,
    payload,
  });

const addNote = (payload) => (dispatch) =>
  dispatch({
    type: ADD_NOTE,
    payload,
  });

const deleteNote = (payload) => (dispatch) =>
  dispatch({
    type: DELETE_NOTE,
    payload,
  });

const updateNotePosition = (payload) => (dispatch) =>
  dispatch({
    type: UPDATE_NOTE_POSITION,
    payload,
  });

export { setActiveForm, addNote, deleteNote, updateNotePosition };
