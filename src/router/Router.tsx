import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthLayout from '@/components/layouts/AuthLayout';
import ErrorPage from '@/pages/ErrorPage';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/router/Routes';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      {PUBLIC_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<AuthLayout {...route.layout}>{route.element}</AuthLayout>}
        />
      ))}

      {/* Private Routes */}
      {PRIVATE_ROUTES.map((route) => (
        <Route key={route.path} {...route} />
      ))}

      {/* Fallback Routes */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
