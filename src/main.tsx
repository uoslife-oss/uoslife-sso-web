import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';

import {
  AuthenticationContextProvider,
  AuthorizationContextProvider,
} from '@/hooks';
import Router from '@/router/Router';
import { GlobalStyle, theme } from '@/utils/styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Toaster position="bottom-left" />

    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthenticationContextProvider>
        <AuthorizationContextProvider>
          <Router />
        </AuthorizationContextProvider>
      </AuthenticationContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
