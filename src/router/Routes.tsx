import { RouteProps } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';

export type LayoutRouteProps = { title?: string; description?: string };
type CustomRouteProps = RouteProps & { layout?: LayoutRouteProps };

export const PUBLIC_ROUTES: CustomRouteProps[] = [
  {
    path: '/login',
    element: <LoginPage />,
    layout: {
      title: '로그인',
      description: '시대생 통합계정을 이용해 로그인할 수 있습니다.',
    },
  },
];

export const PRIVATE_ROUTES: CustomRouteProps[] = [
  {
    path: '/',
    element: <HomePage />,
  },
];

export default {
  PUBLIC_ROUTES,
  PRIVATE_ROUTES,
};
