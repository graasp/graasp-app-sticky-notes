import { v4 as uuid } from 'uuid';

import { AppData, AppDataVisibility } from '@graasp/sdk';

import { APP_DATA_TYPES } from '../../src/config/appDataTypes';
import { DEFAULT_NOTE_COLOR } from '../../src/config/constants';
import { CANVAS_HEIGHT_PX, CANVAS_WIDTH_PX } from '../../src/config/settings';
import { CURRENT_MEMBER, MEMBERS } from './members';
import { MOCK_SERVER_ITEM } from './mockItem';

export const MOCK_SERVER_API_HOST = 'http://localhost:3636';

const X_CENTER = CANVAS_WIDTH_PX / 2;
const Y_CENTER = CANVAS_HEIGHT_PX / 2;

export const NOTES_TOP_LEFT: AppData[] = [
  // comments
  {
    id: uuid(),
    data: {
      text: 'Test note 1',
      color: DEFAULT_NOTE_COLOR,
      position: { pageX: 10 + X_CENTER, pageY: 10 + Y_CENTER },
    },
    member: CURRENT_MEMBER,
    creator: CURRENT_MEMBER,
    item: MOCK_SERVER_ITEM,
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
    type: APP_DATA_TYPES.NOTE,
    visibility: AppDataVisibility.Item,
  },
  {
    id: uuid(),
    data: {
      text: 'Test note 2',
      color: DEFAULT_NOTE_COLOR,
      position: { pageX: 10 + X_CENTER, pageY: 300 + Y_CENTER },
    },
    member: CURRENT_MEMBER,
    creator: CURRENT_MEMBER,
    item: MOCK_SERVER_ITEM,
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
    type: APP_DATA_TYPES.NOTE,
    visibility: AppDataVisibility.Item,
  },
  {
    id: uuid(),
    data: {
      text: 'Test note 2',
      color: DEFAULT_NOTE_COLOR,
      position: { pageX: 300 + X_CENTER, pageY: 10 + Y_CENTER },
    },
    member: MEMBERS.BOB,
    creator: MEMBERS.BOB,
    item: MOCK_SERVER_ITEM,
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
    type: APP_DATA_TYPES.NOTE,
    visibility: AppDataVisibility.Item,
  },
  {
    id: uuid(),
    data: {
      text: 'Test note 2',
      color: DEFAULT_NOTE_COLOR,
      position: { pageX: 300 + X_CENTER, pageY: 300 + Y_CENTER },
    },
    member: CURRENT_MEMBER,
    creator: CURRENT_MEMBER,
    item: MOCK_SERVER_ITEM,
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
    type: APP_DATA_TYPES.NOTE,
    visibility: AppDataVisibility.Item,
  },
];
