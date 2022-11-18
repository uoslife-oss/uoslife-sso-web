import * as React from 'react';
import { ComponentPropsWithRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import AppBar from '@/components/AppBar';
import Sidebar from '@/components/Sidebar';
import Col from '@/components/utils/Col';
import { useAuthenticationContext } from '@/hooks';
import { LayoutRouteProps } from '@/router/Routes';

type Props = ComponentPropsWithRef<'div'> & LayoutRouteProps;

const AppLayout: React.FC<Props> = ({ title, description, children }) => {
  const navigate = useNavigate();
  const { isAuthenticating, isAuthenticated } = useAuthenticationContext();

  useEffect(() => {
    if (isAuthenticating || isAuthenticated) return;
    toast.error('로그인이 필요한 페이지입니다.');
    return navigate('/login');
  }, [isAuthenticating]);

  return (
    <>
      <Helmet>
        <title>
          {title ? `${title} | 시대생 통합계정` : '시대생 통합계정'}
        </title>
        <meta
          property="og:title"
          content={title ? `${title} | 시대생 통합계정` : '시대생 통합계정'}
        />
        <meta property="og:description" content={description} />
      </Helmet>

      <AppBar />

      <Col align="center">
        <GridArea>
          <Sidebar />
          <article>{children}</article>
        </GridArea>
      </Col>
    </>
  );
};

const GridArea = styled.div`
  padding: 78px 16px 16px 16px;
  width: 960px;
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 16px;
`;

export default AppLayout;
