import { v4 as uuid } from 'uuid';

import { AppData } from '@graasp/apps-query-client';

import { APP_DATA_TYPES } from '../../src/config/appDataTypes';
import { DEFAULT_NOTE_COLOR } from '../../src/config/constants';
import { CANVAS_HEIGHT_PX, CANVAS_WIDTH_PX } from '../../src/config/settings';
import { AppDataVisibility } from '../../src/types/appData';
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
    memberId: CURRENT_MEMBER.id,
    creator: CURRENT_MEMBER.id,
    itemId: MOCK_SERVER_ITEM.id,
    createdAt: new Date('2020-01-01').toISOString(),
    updatedAt: new Date('2020-01-01').toISOString(),
    type: APP_DATA_TYPES.NOTE,
    visibility: AppDataVisibility.ITEM,
  },
  {
    id: uuid(),
    data: {
      text: 'Test note 2',
      color: DEFAULT_NOTE_COLOR,
      position: { pageX: 10 + X_CENTER, pageY: 300 + Y_CENTER },
    },
    memberId: CURRENT_MEMBER.id,
    creator: CURRENT_MEMBER.id,
    itemId: MOCK_SERVER_ITEM.id,
    createdAt: new Date('2020-01-01').toISOString(),
    updatedAt: new Date('2020-01-01').toISOString(),
    type: APP_DATA_TYPES.NOTE,
    visibility: AppDataVisibility.ITEM,
  },
  {
    id: uuid(),
    data: {
      text: 'Test note 2',
      color: DEFAULT_NOTE_COLOR,
      position: { pageX: 300 + X_CENTER, pageY: 10 + Y_CENTER },
    },
    memberId: MEMBERS.BOB.id,
    creator: MEMBERS.BOB.id,
    itemId: MOCK_SERVER_ITEM.id,
    createdAt: new Date('2020-01-01').toISOString(),
    updatedAt: new Date('2020-01-01').toISOString(),
    type: APP_DATA_TYPES.NOTE,
    visibility: AppDataVisibility.ITEM,
  },
  {
    id: uuid(),
    data: {
      text: 'Test note 2',
      color: DEFAULT_NOTE_COLOR,
      position: { pageX: 300 + X_CENTER, pageY: 300 + Y_CENTER },
    },
    memberId: CURRENT_MEMBER.id,
    creator: CURRENT_MEMBER.id,
    itemId: MOCK_SERVER_ITEM.id,
    createdAt: new Date('2020-01-01').toISOString(),
    updatedAt: new Date('2020-01-01').toISOString(),
    type: APP_DATA_TYPES.NOTE,
    visibility: AppDataVisibility.ITEM,
  },
];
