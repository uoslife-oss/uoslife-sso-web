import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ActionButton from '@/components/buttons/ActionButton';
import Col from '@/components/utils/Col';
import { useAuthenticationContext } from '@/hooks';
import { useAuthorizationContext } from '@/hooks/AuthorizationContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthenticationContext();
  const { isLoadingProfile, profile } = useAuthorizationContext();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (!isLoadingProfile && profile) setIsLoading(false);
  }, [isLoadingProfile]);

  if (isLoading) {
    return (
      <Col justify="center" align="center" fill>
        정보를 가져오고 있습니다
      </Col>
    );
  }

  return (
    profile && (
      <Col justify="center" align="center" fill gap={16}>
        <h5>{profile.name}님 안녕하세요!</h5>
        <h6>{profile.email}</h6>
        <ActionButton size="sm" fill onClick={logout}>
          로그아웃
        </ActionButton>
      </Col>
    )
  );
};

export default HomePage;
