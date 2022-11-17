import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import Router from '@/router/Router';
import { GlobalStyle, theme } from '@/utils/styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
);
