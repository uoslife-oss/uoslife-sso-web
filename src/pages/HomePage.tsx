import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import AuthStateCard from '@/components/cards/AuthStateCard';
import ProfileCard from '@/components/cards/ProfileCard';
import MenuCard from '@/components/Sidebar/MenuCard';
import Col from '@/components/utils/Col';
import { useAuthorizationContext } from '@/hooks';
import { sidebarConfig } from '@/utils/configs/sidebar.config';

const HomePage: React.FC = () => {
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
    <Col gap={16}>
      {profile && <ProfileCard profile={profile} />}
      {profile && <AuthStateCard state={profile.state} />}

      <MenuArea>
        {sidebarConfig.map((menu) => (
          <MenuContainer key={menu.title}>
            <MenuCard menu={menu} />
          </MenuContainer>
        ))}
      </MenuArea>
    </Col>
  );
};

const MenuArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 16px;
`;

const MenuContainer = styled(Col)`
  padding: 16px 20px;
  border: 1px solid ${({ theme }) => theme.colors.Secondary7};
  border-radius: 12px;
`;

export default HomePage;
