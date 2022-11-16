import * as React from 'react';
import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

type Props = ComponentPropsWithRef<'div'> & {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

const Spacing = React.memo<Props>(({ children, ...restProps }) => (
  <Container {...restProps}>{children}</Container>
));

const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;

  ${({ top }) => top && `margin-top: ${top}px`};
  ${({ bottom }) => bottom && `margin-bottom: ${bottom}px`};
  ${({ left }) => left && `margin-left: ${left}px`};
  ${({ right }) => right && `margin-right: ${right}px`};
`;

export default Spacing;
