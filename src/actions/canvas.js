import { SET_ACTIVE_FORM, ADD_NOTE } from '../types';

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

export { setActiveForm, addNote };
