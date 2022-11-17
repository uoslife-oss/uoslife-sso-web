import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseLayout from '@/components/layouts/BaseLayout';
import Col from '@/components/utils/Col';
import { useAuthenticationContext } from '@/hooks/AuthenticationContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAuthenticating } = useAuthenticationContext();

  useEffect(() => {
    if (isAuthenticating) return;
    if (!isAuthenticated) return navigate('/login');
  }, [isAuthenticating]);

  return (
    <BaseLayout>
      <Col justify="center" align="center" fill>
        <h4>시대생 통합계정</h4>
        <h6>https://sso.uoslife.team</h6>
      </Col>
    </BaseLayout>
  );
};

export default HomePage;
