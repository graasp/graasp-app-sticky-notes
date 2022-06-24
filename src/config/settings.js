import { CONTEXTS } from './contexts';
import { REACT_APP_MOCK_API, REACT_APP_REFETCH_INTERVAL_SETTING } from './env';

export const DEFAULT_LANG = 'en';

export const DEFAULT_API_HOST = 'localhost:3000';

export const PERMISSION_LEVELS = {
  WRITE: 'write',
  READ: 'read',
  ADMIN: 'admin',
};

export const MAX_LENGTH_TITLE = 1024;

export const DEFAULT_ANONYMOUS_USERNAME = 'Anonymous';

export const DEFAULT_PERMISSION = PERMISSION_LEVELS.READ;

export const PUBLIC_VISIBILITY = 'public';
export const DEFAULT_VISIBILITY = PUBLIC_VISIBILITY;

export const PUBLIC_OWNERSHIP = 'all';
export const DEFAULT_OWNERSHIP = PUBLIC_OWNERSHIP;

export const MAX_NUM_FILES = 1;
export const MAX_FILE_SIZE = 5 * 1000 * 1000;

export const DEFAULT_LOCAL_CONTEXT = {
  permission: PERMISSION_LEVELS.READ,
  lang: DEFAULT_LANG,
  context: CONTEXTS.PLAYER,
  apiHost: DEFAULT_API_HOST,
};

export const APP_DATA_VISIBLITIES = {
  ITEM: 'item',
};

export const DEFAULT_BACKGROUND_ENABLED = true;
export const DEFAULT_BACKGROUND_SCALE = 1.0;

export const MOCK_API = REACT_APP_MOCK_API === 'true';

export const RE_FETCH_INTERVAL = REACT_APP_REFETCH_INTERVAL_SETTING ?? 1500; // Default: 1500

export const DEFAULT_CANVAS_DIMENSIONS = 'A4';
