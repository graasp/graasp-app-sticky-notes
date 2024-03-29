import {
  buildMockLocalContext,
  buildMockParentWindow,
  configureQueryClient,
} from '@graasp/apps-query-client';

import { mockContext } from '../data/db';
import { GRAASP_APP_KEY, MOCK_API, WS_HOST } from './env';

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
  notifier: (data) => {
    // eslint-disable-next-line no-console
    console.log('notifier: ', data);
  },
  keepPreviousData: true,
  // avoid refetching when same data are closely fetched
  staleTime: 1000, // ms
  cacheTime: 2000, // ms
  GRAASP_APP_KEY,
  targetWindow: MOCK_API
    ? // build mock parent window given cypress (app) context or mock data
      (buildMockParentWindow(
        buildMockLocalContext(window.Cypress ? window.appContext : mockContext),
      ) as Window)
    : window.parent,
  enableWebsocket: true,
  WS_HOST,
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
