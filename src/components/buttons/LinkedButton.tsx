import * as React from 'react';
import { ComponentPropsWithRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ActionButton from '@/components/buttons/ActionButton';
import { ButtonProps } from '@/components/buttons/index';

type Props = ComponentPropsWithRef<'button'> &
  ButtonProps & {
    to: string;
  };

const LinkedButton: React.FC<Props> = ({ to, children, ...props }) => {
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

const Container = styled(ActionButton)`
  a {
    text-decoration: none;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }
`;

export default LinkedButton;
