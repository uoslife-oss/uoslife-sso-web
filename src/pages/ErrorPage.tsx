import * as React from 'react';

import BaseLayout from '@/components/layouts/BaseLayout';
import Col from '@/components/utils/Col';

const ErrorPage: React.FC = () => (
  <BaseLayout>
    <Col justify="center" align="center" fill>
      <h4>Not Found</h4>
      <h6>404</h6>
    </Col>
  </BaseLayout>
);

export default ErrorPage;
