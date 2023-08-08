import { List } from 'immutable';

import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';

import { AppData } from '@graasp/sdk';
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
  postAppDataAsync: (variables: PostAppDataType) => Promise<AppData>;
  patchAppData: (payload: PatchAppDataType) => void;
  deleteAppData: (payload: DeleteAppDataType) => void;
  appDataArray: List<AppDataRecord>;
};

const defaultContextValue = {
  postAppData: () => null,
  postAppDataAsync: async () => ({} as unknown as AppData),
  patchAppData: () => null,
  deleteAppData: () => null,
  appDataArray: List<AppDataRecord>(),
};

const AppDataContext = createContext<AppDataContextType>(defaultContextValue);

export const AppDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: appData, isLoading } = hooks.useAppData();

  const { mutate: postAppData, mutateAsync: postAppDataAsync } =
    mutations.usePostAppData();
  const { mutate: patchAppData } = mutations.usePatchAppData();
  const { mutate: deleteAppData } = mutations.useDeleteAppData();

  const contextValue: AppDataContextType = useMemo<AppDataContextType>(
    () => ({
      postAppDataAsync,
      postAppData,
      patchAppData,
      deleteAppData,
      appDataArray: appData || List<AppDataRecord>(),
    }),
    [appData, deleteAppData, patchAppData, postAppData, postAppDataAsync],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataContext = (): AppDataContextType =>
  useContext<AppDataContextType>(AppDataContext);
