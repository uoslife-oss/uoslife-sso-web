import * as React from 'react';
import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

type Props = ComponentPropsWithRef<'div'>;

const BaseLayout: React.FC<Props> = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.White};
`;

export default BaseLayout;
