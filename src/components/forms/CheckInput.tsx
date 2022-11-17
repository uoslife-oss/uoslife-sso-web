import * as React from 'react';
import { ComponentPropsWithRef, forwardRef } from 'react';
import styled, { css } from 'styled-components';

import Row from '@/components/utils/Row';

type Props = ComponentPropsWithRef<'input'> & {
  label: string;
  error?: string | null;
};

const CheckInput: React.FC<Props> = forwardRef(
  ({ label, error, ...restProps }, ref) => {
    return (
      <Container gap={6} align="center">
        <Input type="checkbox" {...restProps} ref={ref} />
        <Label $hasError={!!error}>{label}</Label>
      </Container>
    );
  },
);

const Container = styled(Row)``;

const Input = styled.input`
  height: 16px;
  width: 16px;
  border: 1px solid ${({ theme }) => theme.colors.Secondary6};
  border-radius: 4px;
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.Secondary4};
  }
`;

const Label = styled.label<{ $hasError: boolean }>`
  ${({ theme }) => theme.typographies.Body3}

  ${({ $hasError }) =>
    $hasError &&
    css`
      color: ${({ theme }) => theme.colors.Danger4};
    `}
`;

export default CheckInput;
