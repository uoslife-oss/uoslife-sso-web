import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import ActionButton from '@/components/buttons/ActionButton';
import MenuArea from '@/components/Sidebar/MenuArea';
import ProfileArea from '@/components/Sidebar/ProfileArea';
import Col from '@/components/utils/Col';
import { useAuthenticationContext } from '@/hooks';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthenticationContext();

  return (
    <Col gap={32}>
      <ProfileArea />
      <MenuArea />
      <ActionButton
        size="sm"
        color="secondary"
        design="outline"
        onClick={() => logout(navigate)}
      >
        로그아웃
      </ActionButton>
    </Col>
  );
};

export default Sidebar;
