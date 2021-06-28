import { combineReducers } from 'redux';
import context from './context';
import appInstanceResources from './appInstanceResources';
import users from './users';
import appInstance from './appInstance';
import layout from './layout';
import canvas from './canvas';
import uppy from './uppy';

export default combineReducers({
  // keys should always be lowercase
  context,
  appInstanceResources,
  users,
  appInstance,
  layout,
  canvas,
  uppy,
});
