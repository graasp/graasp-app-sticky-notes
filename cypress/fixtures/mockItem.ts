import { MEMBERS } from './members';

export const MOCK_SERVER_ITEM = {
  id: '123456789',
  name: 'app-starter-ts-vite',
  description: null,
  path: '',
  settings: {},
  creator: MEMBERS[0],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// import { AppItemType, ItemType } from '@graasp/sdk';

// import { MEMBERS } from './members';

// export const MOCK_SERVER_ITEM: AppItemType = {
//   id: '1234567890',
//   settings: {},
//   name: 'app',
//   path: '1234567890',
//   description: '',
//   creator: MEMBERS[0],
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   type: ItemType.APP,
//   extra: {
//     [ItemType.APP]: {
//       url: 'myapp.html',
//     },
//   },
// };
