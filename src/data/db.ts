import { v4 } from 'uuid';

import type { Database, LocalContext } from '@graasp/apps-query-client';
import {
  AppDataVisibility,
  AppItemType,
  Context,
  ItemType,
  Member,
  MemberType,
  PermissionLevel,
} from '@graasp/sdk';

import { APP_DATA_TYPES } from '../config/appDataTypes';
import { REACT_APP_API_HOST } from '../config/env';

export const mockMembers: Member[] = [
  {
    id: 'mock-member-id',
    name: 'current-member',
    email: 'current@graasp.org',
    extra: {},
    type: MemberType.Individual,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-member-id-2',
    name: 'mock-member-2',
    email: 'other-member@graasp.org',
    extra: {},
    type: MemberType.Individual,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockItem: AppItemType = {
  id: 'my-app-id',
  path: 'my_app_id',
  name: 'my app',
  type: ItemType.APP,
  extra: {
    [ItemType.APP]: {
      url: 'someurl',
    },
  },
  settings: {},
  description: '',
  creator: mockMembers[0],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockContext: LocalContext = {
  apiHost: REACT_APP_API_HOST,
  permission: PermissionLevel.Admin,
  context: Context.Builder,
  itemId: mockItem.id,
  memberId: mockMembers[0].id,
};

const buildDatabase = (): Database => ({
  appData: [
    {
      data: {
        color: '#FFFF99',
        position: { pageX: 100, pageY: 100 },
        text: '<p>note 1</p>',
      },
      id: v4(),
      type: APP_DATA_TYPES.NOTE,
      createdAt: new Date(),
      updatedAt: new Date(),
      creator: mockMembers[0],
      member: mockMembers[0],
      item: mockItem,
      visibility: AppDataVisibility.Item,
    },
  ],
  appActions: [],
  members: mockMembers,
  appSettings: [],
  items: [mockItem],
});

export default buildDatabase;
