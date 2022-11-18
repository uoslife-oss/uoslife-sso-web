import * as React from 'react';
import styled from 'styled-components';

import Row from '@/components/utils/Row';

const Logo: React.FC = () => (
  <Row align="center" gap={8}>
    <LogoImage src="/logo.svg" alt="" />
    <LogoTitle>시대생 통합계정</LogoTitle>
  </Row>
);

const LogoImage = styled.img`
  height: 24px;
`;

const LogoTitle = styled.h5`
  color: ${({ theme }) => theme.colors.Black};
`;

export default Logo;
