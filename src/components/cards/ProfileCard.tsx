import * as React from 'react';
import styled from 'styled-components';

import AvatarImage from '@/components/common/AvatarImage';
import Emoji from '@/components/common/Emoji';
import Logo from '@/components/common/Logo';
import Col from '@/components/utils/Col';
import Row from '@/components/utils/Row';
import { ProfileResponse } from '@/models';

type Props = {
  profile: ProfileResponse;
};

const ProfileCard: React.FC<Props> = ({ profile }) => (
  <Container gap={48}>
    <Row justify="flex-end">
      <Logo />
    </Row>
    <Row gap={16} align="center">
      <AvatarImage size={84} src={profile.profileImage} />
      <Col gap={4}>
        <h4>
          <Emoji size={20}>👋</Emoji> 안녕하세요, {profile.name}님!
        </h4>
        <h6>{profile.nickname}</h6>
        <p>{profile.email}</p>
      </Col>
    </Row>
  </Container>
);

const Container = styled(Col)`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.Secondary7};
  border-radius: 12px;
`;

export default ProfileCard;
