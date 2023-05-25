/* eslint-disable prettier/prettier */
import {
  buildMockLocalContext,
  buildMockParentWindow,
  configureQueryClient,
} from '@graasp/apps-query-client';

import { mockContext } from '../data/db';
import { MOCK_API, REACT_APP_GRAASP_APP_KEY } from './env';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
  API_ROUTES,
  MUTATION_KEYS,
  mutations,
} = configureQueryClient({
  keepPreviousData: true,
  // avoid refetching when same data are closely fetched
  staleTime: 1000, // ms
  GRAASP_APP_KEY: REACT_APP_GRAASP_APP_KEY,
  targetWindow: MOCK_API
    ? // build mock parent window given cypress (app) context or mock data
      (buildMockParentWindow(
        buildMockLocalContext(window.Cypress ? window.appContext : mockContext),
      ) as Window)
    : window.parent,
  // retry: (e) => {
  //   console.log('ijkfmn', e)
  //   return false;
  // }
});

export {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
  API_ROUTES,
  MUTATION_KEYS,
  mutations,
};
