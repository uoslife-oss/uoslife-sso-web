import * as React from 'react';

import BaseLayout from '@/components/layouts/BaseLayout';
import Col from '@/components/utils/Col';

const LoginPage: React.FC = () => (
  <BaseLayout>
    <Col justify="center" align="center" fill>
      <h4>시대생 통합계정</h4>
      <h6>https://sso.uoslife.team/login</h6>
    </Col>
  </BaseLayout>
);

export default LoginPage;
