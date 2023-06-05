import { List } from 'immutable';

import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';

import { AppActionRecord } from '@graasp/sdk/frontend';

import { hooks, mutations } from '../../config/queryClient';

type PostAppActionType = {
  data: { [key: string]: unknown };
  type: string;
};

export type AppActionContextType = {
  postAppAction: (payload: PostAppActionType) => void;
  appActionArray: List<AppActionRecord>;
};

const defaultContextValue = {
  postAppAction: () => null,
  appActionArray: List<AppActionRecord>(),
};

const AppActionContext =
  createContext<AppActionContextType>(defaultContextValue);

export const AppActionProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: appAction } = hooks.useAppActions({ enabled: true });

  const { mutate: postAppAction } = mutations.usePostAppAction();

  const contextValue: AppActionContextType = useMemo(
    () => ({
      postAppAction: (payload: PostAppActionType) => {
        postAppAction(payload);
      },
      appActionArray: appAction || List<AppActionRecord>(),
    }),
    [appAction, postAppAction],
  );

  return (
    <AppActionContext.Provider value={contextValue}>
      {children}
    </AppActionContext.Provider>
  );
};

export const useAppActionContext = (): AppActionContextType =>
  useContext<AppActionContextType>(AppActionContext);
