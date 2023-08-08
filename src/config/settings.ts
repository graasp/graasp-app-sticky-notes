import { PermissionLevel } from '@graasp/sdk';

import { REFETCH_INTERVAL_SETTING } from './env';

export const DEFAULT_LANG = 'en';

export const DEFAULT_API_HOST = 'localhost:3000';

export const MAX_LENGTH_TITLE = 1024;

export const DEFAULT_ANONYMOUS_USERNAME = 'Anonymous';

export const DEFAULT_PERMISSION: PermissionLevel = PermissionLevel.Read;

export const PUBLIC_VISIBILITY = 'public';
export const DEFAULT_VISIBILITY = PUBLIC_VISIBILITY;

export const PUBLIC_OWNERSHIP = 'all';
export const DEFAULT_OWNERSHIP = PUBLIC_OWNERSHIP;

export const MAX_NUM_FILES = 1;
export const MAX_FILE_SIZE = 5 * 1000 * 1000;

export const DEFAULT_BACKGROUND_ENABLED = true;
export const DEFAULT_BACKGROUND_SCALE = 1.0;

export const RE_FETCH_INTERVAL: number = REFETCH_INTERVAL_SETTING ?? 1500; // Default: 1500

export const DEFAULT_CANVAS_DIMENSIONS = 'A4';

export const CANVAS_WIDTH_PX = 4096;
export const CANVAS_HEIGHT_PX = 2160;

export const ZOOM_MAX = 2;
export const ZOOM_MIN = 0.2;
export const ZOOM_STEP = 0.2;
