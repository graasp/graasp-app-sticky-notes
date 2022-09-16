import {
  configureQueryClient,
  buildMockLocalContext,
  buildMockParentWindow,
} from '@graasp/apps-query-client';
import { REACT_APP_GRAASP_APP_ID } from './env';
import { MOCK_API } from './settings';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
  MUTATION_KEYS,
  API_ROUTES,
} = configureQueryClient({
  notifier: (data) => {
    /* eslint-disable-next-line no-console */
    console.info('notifier: ', data);
  },
  enableWebsocket: false,
  keepPreviousData: true,
  // avoid refetching when same data are closely fetched
  staleTime: 1000, // ms
  GRAASP_APP_ID: REACT_APP_GRAASP_APP_ID,
  targetWindow: MOCK_API
    ? // build mock parent window given cypress context or mock data
      buildMockParentWindow(buildMockLocalContext(window.appContext))
    : window.parent,
});

export {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
  MUTATION_KEYS,
  API_ROUTES,
};
