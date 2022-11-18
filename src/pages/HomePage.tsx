import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import AvatarImage from '@/components/common/AvatarImage';
import Emoji from '@/components/common/Emoji';
import Logo from '@/components/common/Logo';
import MenuCard from '@/components/Sidebar/MenuCard';
import Col from '@/components/utils/Col';
import Row from '@/components/utils/Row';
import { useAuthenticationContext } from '@/hooks';
import { useAuthorizationContext } from '@/hooks/AuthorizationContext';
import { sidebarConfig } from '@/utils/configs/sidebar.config';

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
    <Col gap={16}>
      {profile && (
        <ProfileCard gap={48}>
          <Row justify="flex-end">
            <Logo />
          </Row>
          <Row gap={16} align="center">
            <AvatarImage size={72} src={profile.profileImage} />
            <Col gap={4}>
              <h4>
                <Emoji size={20}>👋</Emoji> 안녕하세요, {profile.name}님!
              </h4>
              <p>{profile.email}</p>
            </Col>
          </Row>
        </ProfileCard>
      )}

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

const ProfileCard = styled(Col)`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.Secondary7};
  border-radius: 12px;
`;

const MenuArea = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  gap: 16px;
`;

const MenuContainer = styled(Col)`
  padding: 16px 20px;
  border: 1px solid ${({ theme }) => theme.colors.Secondary7};
  border-radius: 12px;
`;

export default HomePage;
