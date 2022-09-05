import { useContext } from 'react';
import { Context, TokenContext } from '@graasp/apps-query-client';
import { hooks } from '../../config/queryClient';
import { RE_FETCH_INTERVAL } from '../../config/settings';

export const useAppData = () => {
  const context = useContext(Context);
  const token = useContext(TokenContext);
  const query = hooks.useAppData(
    { token, itemId: context?.get('itemId') },
    RE_FETCH_INTERVAL,
  );
  return query;
};

export const useAppSettings = () => {
  const context = useContext(Context);
  const token = useContext(TokenContext);
  const query = hooks.useAppSettings({ token, itemId: context?.get('itemId') });
  return query;
};

export const useAppActions = () => {
  const context = useContext(Context);
  const token = useContext(TokenContext);
  const query = hooks.useAppActions({ token, itemId: context?.get('itemId') });
  return query;
};

export const useAppContext = () => {
  const context = useContext(Context);
  const token = useContext(TokenContext);
  const query = hooks.useAppContext({ token, itemId: context?.get('itemId') });
  return query;
};

export const useAppSettingFile = (appSettingId, enabled) => {
  const token = useContext(TokenContext);
  const query = hooks.useAppSettingFile({ token, appSettingId }, { enabled });
  return query;
};
