import * as React from 'react';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

type Props = PropsWithChildren<{
  padding?: number;
}>;

const BaseCard: React.FC<Props> = ({ padding, children }) => (
  <Container padding={padding}>{children}</Container>
);

const Container = styled.div<Props>`
  padding: ${({ padding }) => padding ?? 24}px;
  background: ${({ theme }) => theme.colors.White};
  border: 1px solid ${({ theme }) => theme.colors.Secondary7};
  border-radius: 12px;
`;

export default BaseCard;
