import { List } from 'immutable';

import React, { FC, PropsWithChildren, createContext, useMemo } from 'react';

import { AppDataRecord } from '@graasp/sdk/frontend';
import { Loader } from '@graasp/ui';

import { hooks, mutations } from '../../config/queryClient';
import {
  DeleteAppDataType,
  PatchAppDataType,
  PostAppDataType,
} from '../../types/appData';

export type AppDataContextType = {
  postAppData: (variables: PostAppDataType) => void;
  postAppDataAsync: (variables: PostAppDataType) => Promise<AppDataRecord>;
  patchAppData: (payload: PatchAppDataType) => void;
  deleteAppData: (payload: DeleteAppDataType) => void;
  appDataArray: List<AppDataRecord>;
};

const defaultContextValue = {
  postAppData: () => null,
  // todo: fix type
  postAppDataAsync: async () => ({} as any),
  patchAppData: () => null,
  deleteAppData: () => null,
  appDataArray: List<AppDataRecord>(),
};

const AppDataContext = createContext<AppDataContextType>(defaultContextValue);

export const AppDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const appData = hooks.useAppData();

  const { mutate: postAppData, mutateAsync: postAppDataAsync } =
    mutations.usePostAppData();
  const { mutate: patchAppData } = mutations.usePatchAppData();
  const { mutate: deleteAppData } = mutations.useDeleteAppData();

  const contextValue: AppDataContextType = useMemo(
    () => ({
      postAppDataAsync,
      postAppData,
      patchAppData,
      deleteAppData,
      appDataArray: appData.data || List<AppDataRecord>(),
    }),
    [appData.data, deleteAppData, patchAppData, postAppData, postAppDataAsync],
  );

  if (appData.isLoading) {
    return <Loader />;
  }

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataContext = (): AppDataContextType =>
  React.useContext<AppDataContextType>(AppDataContext);
