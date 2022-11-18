import * as React from 'react';
import { ReactChannelIO } from 'react-channel-plugin';
import * as ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';

import { AuthenticationContextProvider } from '@/hooks/AuthenticationContext';
import { AuthorizationContextProvider } from '@/hooks/AuthorizationContext';
import Router from '@/router/Router';
import config from '@/utils/configs/common.config';
import { GlobalStyle, theme } from '@/utils/styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    {import.meta.env.PROD && (
      <ReactChannelIO
        pluginKey={config.CHANNEL_IO_PLUGIN_KEY}
        language="ko"
        autoBoot
      />
    )}

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
