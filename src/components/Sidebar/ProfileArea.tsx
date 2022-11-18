import * as React from 'react';
import styled from 'styled-components';

import AvatarImage from '@/components/common/AvatarImage';
import Col from '@/components/utils/Col';
import Row from '@/components/utils/Row';
import { useAuthorizationContext } from '@/hooks/AuthorizationContext';

const ProfileArea: React.FC = () => {
  const { profile } = useAuthorizationContext();

  return (
    profile && (
      <Col gap={16}>
        <Row gap={16} align="center">
          <AvatarImage size={56} src={profile.profileImage} />
          <Col>
            <ProfileName>{profile.name}</ProfileName>
            <ProfileEmail>{profile.email}</ProfileEmail>
          </Col>
        </Row>
      </Col>
    )
  );
};

const ProfileName = styled.h5`
  font-weight: 700;
`;

const ProfileEmail = styled.p`
  ${({ theme }) => theme.typographies.Body3};
`;

export default ProfileArea;
