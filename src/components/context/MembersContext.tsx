import { List } from 'immutable';

import React, { FC, ReactElement, createContext, useMemo } from 'react';

import { MemberRecord } from '@graasp/sdk/frontend';
import { Loader } from '@graasp/ui';

import { hooks } from '../../config/queryClient';

const defaultContextValue = List<MemberRecord>();
const MembersContext = createContext<List<MemberRecord>>(defaultContextValue);

type Prop = {
  children: ReactElement | ReactElement[];
};

export const MembersProvider: FC<Prop> = ({ children }) => {
  const appContext = hooks.useAppContext();

  const members = useMemo<List<MemberRecord>>(() => {
    const updatedMembers = appContext.data?.members;

    return updatedMembers ?? defaultContextValue;
  }, [appContext.data]);

  if (appContext.isLoading) {
    return <Loader />;
  }

  return (
    <MembersContext.Provider value={members}>
      {children}
    </MembersContext.Provider>
  );
};

export const useMembersContext = (): List<MemberRecord> =>
  React.useContext<List<MemberRecord>>(MembersContext);
