import * as React from 'react';
import { ComponentPropsWithRef, forwardRef } from 'react';
import styled, { css } from 'styled-components';

import Col from '@/components/utils/Col';

type Props = ComponentPropsWithRef<'input'> & {
  label?: string;
  error?: string | null;
};

const TextInput: React.FC<Props> = forwardRef(
  ({ disabled, label, error, ...restProps }, ref) => {
    return (
      <Col gap={4}>
        {label && <Label>{label}</Label>}
        <Container hasError={!!error} disabled={disabled}>
          <Input {...restProps} ref={ref} disabled={disabled} />
        </Container>
        {error && <Error>{error}</Error>}
      </Col>
    );
  },
);

const Container = styled.div<Props & { hasError: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.Secondary7};
  border-radius: 8px;
  transition: 0.2s ease-in-out;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.Secondary4};
  }

  ${({ theme, disabled }) =>
    disabled &&
    css`
      background: ${theme.colors.Secondary7};
      cursor: not-allowed;
    `}

  ${({ theme, hasError }) =>
    hasError && `border-color: ${theme.colors.Danger2};`}
`;

const Label = styled.label`
  ${({ theme }) => theme.typographies.Body3}
  font-weight: 600;
  color: ${({ theme }) => theme.colors.Secondary1};
`;

const Error = styled.p`
  ${({ theme }) => theme.typographies.Body3}
  color: ${({ theme }) => theme.colors.Danger2};
`;

const Input = styled.input<Props>`
  ${({ theme }) => theme.typographies.Body3}
  width: 100%;
  border: none;
  outline: none;

  &:disabled {
    background: transparent;
  }
`;

export default TextInput;
