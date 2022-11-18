import { RouteProps } from 'react-router-dom';

import LoginPage from '@/pages/auth/LoginPage';
import RecoveryPage from '@/pages/auth/RecoveryPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import HomePage from '@/pages/HomePage';

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
  {
    path: '/register',
    element: <RegisterPage />,
    layout: {
      title: '회원가입',
      description: '새로워진 시대생 통합계정으로 가입할 수 있습니다.',
    },
  },
  {
    path: '/recovery',
    element: <RecoveryPage />,
    layout: {
      title: '계정 찾기',
      description: '이메일 인증으로 계정을 찾을 수 있습니다.',
    },
  },
];

export const PRIVATE_ROUTES: CustomRouteProps[] = [
  {
    path: '/',
    element: <HomePage />,
    layout: {
      title: '내 계정',
    },
  },
];

export default {
  PUBLIC_ROUTES,
  PRIVATE_ROUTES,
};
