import * as React from 'react';
import { ComponentPropsWithRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { BaseButton, ButtonProps } from '@/components/buttons/index';

const LinkedButton: React.FC<
  ComponentPropsWithRef<'div'> &
    ButtonProps & {
      to: string;
    }
> = ({ to, children, ...props }) => {
  return (
    <Container {...props}>
      {to.startsWith('/') && <Link to={to}>{children}</Link>}
      {to.startsWith('http') && (
        <a href={to} target="_blank" rel="noreferrer">
          {children}
        </a>
      )}
    </Container>
  );
};

const Container = styled(BaseButton)`
  a {
    text-decoration: none;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    &:hover {
      text-decoration: none;
    }
  }
`;

export default LinkedButton;
