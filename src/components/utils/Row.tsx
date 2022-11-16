import * as React from 'react';
import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

import { FlexConfigurations } from '@/components/utils/index';

type Props = ComponentPropsWithRef<'div'> &
  FlexConfigurations & {
    padding?: number;
  };

const Row: React.FC<Props> = ({ children, fill, ...restProps }) => (
  <Container $fill={fill} {...restProps}>
    {children}
  </Container>
);

const Container = styled.div<Props & { $fill?: boolean }>`
  display: flex;
  flex-direction: row;

  ${({ padding }) => padding && `padding: ${padding}px;`}
  ${({ justify }) => justify && `justify-content: ${justify};`};
  ${({ align }) => align && `align-items: ${align};`};
  ${({ gap }) => gap && `row-gap: ${gap}px;`};
  ${({ reverse }) => reverse && 'flex-direction: row-reverse;'}
  ${({ fill }) => fill && 'flex-grow: 1;'}
`;

export default Row;
