import { v4 as uuid } from 'uuid';

import { AppData } from '@graasp/apps-query-client';

import { APP_DATA_TYPES } from '../../src/config/appDataTypes';
import { DEFAULT_NOTE_COLOR } from '../../src/config/constants';
import { CURRENT_MEMBER, MEMBERS } from './members';
import { MOCK_SERVER_ITEM } from './mockItem';

export const MOCK_SERVER_API_HOST = 'http://localhost:3636';

export const NOTES_TOP_LEFT: AppData[] = [
  // comments
  {
    id: uuid(),
    data: {
      text: 'Test note 1',
      color: DEFAULT_NOTE_COLOR,
      position: { pageX: 10, pageY: 10 },
    },
    memberId: CURRENT_MEMBER.id,
    creator: CURRENT_MEMBER.id,
    itemId: MOCK_SERVER_ITEM.id,
    createdAt: new Date('2020-01-01').toISOString(),
    updatedAt: new Date('2020-01-01').toISOString(),
    type: APP_DATA_TYPES.NOTE,
  },
  {
    id: uuid(),
    data: {
      text: 'Test note 2',
      color: DEFAULT_NOTE_COLOR,
      position: { pageX: 10, pageY: 300 },
    },
    memberId: CURRENT_MEMBER.id,
    creator: CURRENT_MEMBER.id,
    itemId: MOCK_SERVER_ITEM.id,
    createdAt: new Date('2020-01-01').toISOString(),
    updatedAt: new Date('2020-01-01').toISOString(),
    type: APP_DATA_TYPES.NOTE,
  },
  {
    id: uuid(),
    data: {
      text: 'Test note 2',
      color: DEFAULT_NOTE_COLOR,
      position: { pageX: 300, pageY: 10 },
    },
    memberId: MEMBERS.BOB.id,
    creator: MEMBERS.BOB.id,
    itemId: MOCK_SERVER_ITEM.id,
    createdAt: new Date('2020-01-01').toISOString(),
    updatedAt: new Date('2020-01-01').toISOString(),
    type: APP_DATA_TYPES.NOTE,
  },
  {
    id: uuid(),
    data: {
      text: 'Test note 2',
      color: DEFAULT_NOTE_COLOR,
      position: { pageX: 300, pageY: 300 },
    },
    memberId: CURRENT_MEMBER.id,
    creator: CURRENT_MEMBER.id,
    itemId: MOCK_SERVER_ITEM.id,
    createdAt: new Date('2020-01-01').toISOString(),
    updatedAt: new Date('2020-01-01').toISOString(),
    type: APP_DATA_TYPES.NOTE,
  },
];
