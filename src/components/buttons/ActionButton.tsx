import * as React from 'react';
import { ComponentPropsWithRef } from 'react';
import styled, { css } from 'styled-components';

import {
  ButtonProps,
  generateButtonStyles,
  getCalculatedSize,
} from '@/components/buttons/index';

const ActionButton: React.FC<ComponentPropsWithRef<'button'> & ButtonProps> = ({
  size,
  color,
  design,
  fill,
  disabled,
  children,
  ...restProps
}) => {
  return (
    <Container
      $fill={fill}
      $disabled={disabled}
      size={size ?? 'md'}
      color={color ?? 'primary'}
      design={design ?? 'solid'}
      {...restProps}
    >
      {children}
    </Container>
  );
};

const Container = styled.button<
  ButtonProps & { $fill?: boolean; $disabled?: boolean }
>`
  border: 1px solid transparent;
  background: transparent;

  ${({ size, theme }) => getCalculatedSize(size, theme)}
  ${({ design, color, theme }) =>
    generateButtonStyles({ color, design }, theme)}
  
  max-width: fit-content;
  line-height: 1;
  border-radius: 8px;
  font-weight: 700;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  ${({ $fill }) =>
    $fill &&
    css`
      max-width: initial;
      flex-grow: 1;
      width: 100%;
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
    `}
`;

export default ActionButton;
