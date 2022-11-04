import React from 'react';
import { I18nextProvider } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { withContext, withToken } from '@graasp/apps-query-client';
import { Loader } from '@graasp/ui';

import { CssBaseline, ThemeProvider, createTheme, styled } from '@mui/material';
import grey from '@mui/material/colors/grey';
import orange from '@mui/material/colors/orange';
import pink from '@mui/material/colors/pink';
import { StyledEngineProvider } from '@mui/material/styles';

import i18nConfig from '../config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  hooks,
  queryClient,
} from '../config/queryClient';
import { showErrorToast } from '../utils/toasts';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5050d2',
    },
    secondary: pink,
    default: grey['500'],
    background: {
      paper: '#fff',
    },
  },
  status: {
    danger: {
      background: orange['400'],
      color: '#fff',
    },
  },
});

const RootDiv = styled('div')({
  flexGrow: 1,
  height: '100%',
});

const Root = () => {
  const AppWithContext = withToken(App, {
    LoadingComponent: <Loader />,
    useAuthToken: hooks.useAuthToken,
    onError: () => {
      showErrorToast('An error occured while requesting the token.');
    },
  });

  const AppWithContextAndToken = withContext(AppWithContext, {
    LoadingComponent: <Loader />,
    useGetLocalContext: hooks.useGetLocalContext,
    onError: () => {
      showErrorToast('An error occured while fetching the context.');
    },
  });

  return (
    <RootDiv>
      {/* Used to define the order of injected properties between JSS and emotion */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <I18nextProvider i18n={i18nConfig}>
            <QueryClientProvider client={queryClient}>
              <AppWithContextAndToken />
              {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
            </QueryClientProvider>
          </I18nextProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </RootDiv>
  );
};

export default Root;
