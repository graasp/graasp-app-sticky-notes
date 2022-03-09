import { LOCAL_API_HOST } from './api';
import { CONTEXTS } from './contexts';
import { REACT_APP_MOCK_API } from './env';

export const MAX_INPUT_LENGTH = 5000;
export const MAX_ROWS = 10;
export const DEFAULT_LANG = 'en';
export const DEFAULT_MODE = 'student';
export const TEACHER_MODE = 'teacher';

// TODO: Delete.
// avoid breaking the app in production when embedded in different contexts
let defaultApiHost;
try {
  defaultApiHost =
    window.parent.location.hostname === 'localhost' ? LOCAL_API_HOST : null;
} catch (e) {
  /* eslint-disable-next-line no-console */
  console.error(e);
  defaultApiHost = null;
}

export const DEFAULT_API_HOST = defaultApiHost;

export const MODES = {
  TEACHER: 'teacher',
  STUDENT: 'student',
  PRODUCER: 'producer',
  EDUCATOR: 'educator',
  ADMIN: 'admin',
  CONSUMER: 'consumer',
  LEARNER: 'learner',
};

// todo: use from graasp constants
export const PERMISSION_LEVELS = {
  WRITE: 'write',
  READ: 'read',
  ADMIN: 'admin',
};

export const DEFAULT_PERMISSION = 'read';

// we haven't decided what to call the teacher mode
export const TEACHER_MODES = [TEACHER_MODE, 'producer', 'educator', 'admin'];

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

export const DEFAULT_BACKGROUND_IMAGE = {
  uri: null,
  visible: false,
  name: null,
}

export const MOCK_API = REACT_APP_MOCK_API === 'true';