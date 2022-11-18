import * as React from 'react';
import { ComponentPropsWithRef } from 'react';

import { BaseButton, ButtonProps } from '@/components/buttons/index';

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
    <BaseButton
      as="button"
      $fill={fill}
      $disabled={disabled}
      disabled={disabled}
      size={size ?? 'md'}
      color={color ?? 'primary'}
      design={design ?? 'solid'}
      {...restProps}
    >
      {children}
    </BaseButton>
  );
};

export default ActionButton;
