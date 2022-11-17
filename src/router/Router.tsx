import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthLayout from '@/components/layouts/AuthLayout';
import ErrorPage from '@/pages/ErrorPage';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/router/Routes';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {PUBLIC_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<AuthLayout {...route.layout}>{route.element}</AuthLayout>}
        />
      ))}

      {PRIVATE_ROUTES.map((route) => (
        <Route key={route.path} {...route} />
      ))}

      <Route
        path="*"
        element={
          <AuthLayout
            title="404 Not Found"
            description="페이지를 찾을 수 없습니다."
          >
            <ErrorPage />
          </AuthLayout>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
