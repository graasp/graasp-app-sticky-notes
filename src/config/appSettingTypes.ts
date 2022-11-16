import { AppSetting } from '@graasp/apps-query-client';

enum APP_SETTINGS_TYPES {
  BACKGROUND_SETTINGS = 'background-settings',
  BACKGROUND = 'background',
}

export type BackgroundSettingsType = AppSetting & {
  data: {
    toggle: boolean;
    scale: number;
  };
};

export type BackgroundType = AppSetting & {
  data: {
    extra?: {
      file?: string;
      s3File?: string;
    };
  };
};

export { APP_SETTINGS_TYPES };
