import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '@/components/common/Logo';
import Row from '@/components/utils/Row';

const AppBar: React.FC = () => {
  return (
    <Container justify="center" align="center">
      <Wrapper justify="space-between" align="center">
        <LogoLink to="/">
          <Logo />
        </LogoLink>
      </Wrapper>
    </Container>
  );
};

const Container = styled(Row)`
  position: fixed;
  top: 0;
  height: 54px;
  width: 100%;
  background: ${({ theme }) => theme.colors.White};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled(Row)`
  width: 960px;
  padding: 0 16px;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export default AppBar;
