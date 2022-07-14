import { CONTEXTS } from '../config/contexts';
import { PERMISSION_LEVELS } from '../config/settings';

const buildDatabase = (appContext) => ({
  appData: [
    {
      data: {
        color: '#FFFF99',
        position: { pageX: 100, pageY: 100 },
        rotation: 1,
        minimized: false,
        title: 'Note 1',
      },
      type: 'note',
    },
  ],
  appActions: [],
  members: [
    {
      id: appContext.memberId,
      name: 'mock-member',
    },
  ],
});

export const mockContext = {
  permission: PERMISSION_LEVELS.WRITE,
  context: CONTEXTS.BUILDER,
};

export default buildDatabase;
