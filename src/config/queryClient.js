import { configureQueryClient } from '@graasp/apps-query-client';
// import notifier from '../middlewares/notifier';
import { REACT_APP_GRAASP_APP_ID } from './env';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
  API_ROUTES,
  MUTATION_KEYS,
  HOOK_KEYS,
} = configureQueryClient({
  // API_HOST,
  // notifier,
  enableWebsocket: true,
  keepPreviousData: true,
  // avoid refetching when same data are closely fetched
  staleTime: 1000, // ms
  GRAASP_APP_ID: REACT_APP_GRAASP_APP_ID,
});

export {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
  API_ROUTES,
  MUTATION_KEYS,
  HOOK_KEYS,
};
