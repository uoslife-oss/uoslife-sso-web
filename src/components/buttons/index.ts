import { css, DefaultTheme } from 'styled-components';

export type ButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
  design?: 'solid' | 'outline' | 'text';
  fill?: boolean;
  disabled?: boolean;
};

export const getCalculatedSize = (
  size: ButtonProps['size'],
  theme: DefaultTheme,
) => {
  if (size === 'sm')
    return css`
      ${theme.typographies.Body3};
      padding: 8px 12px;
    `;

  if (size === 'lg')
    return css`
      ${theme.typographies.Heading5};
      padding: 16px 24px;
    `;

  return css`
    ${theme.typographies.Body2};
    padding: 12px 20px;
  `;
};

export const generateButtonStyles = (
  props: Omit<ButtonProps, 'size' | 'fill'>,
  theme: DefaultTheme,
) => {
  if (props.color === 'primary') {
    if (props.design === 'solid') {
      return css`
        background: ${theme.colors.Primary4};
        color: ${theme.colors.White};
        &:hover {
          background: ${theme.colors.Primary3};
        }
      `;
    }

    if (props.design === 'outline') {
      return css`
        color: ${theme.colors.Primary4};
        border: 1px solid ${theme.colors.Primary4};
        &:hover {
          background: ${theme.colors.Primary4};
          color: ${theme.colors.White};
        }
      `;
    }

    if (props.design === 'text') {
      return css`
        color: ${theme.colors.Primary4};
        &:hover {
          background: transparent;
          color: ${theme.colors.Primary4};
          border: 1px solid ${theme.colors.Primary4};
        }
      `;
    }
  }

  if (props.color === 'secondary') {
    if (props.design === 'solid') {
      return css`
        background: ${theme.colors.Secondary7};
        color: ${theme.colors.Secondary2};
        &:hover {
          background: ${theme.colors.Secondary6};
        }
      `;
    }

    if (props.design === 'outline') {
      return css`
        color: ${theme.colors.Secondary2};
        border: 1px solid ${theme.colors.Secondary7};
        &:hover {
          background: ${theme.colors.Secondary7};
          color: ${theme.colors.Secondary2};
        }
      `;
    }

    if (props.design === 'text') {
      return css`
        color: ${theme.colors.Secondary2};
        &:hover {
          color: ${theme.colors.Secondary2};
          border: 1px solid ${theme.colors.Secondary7};
        }
      `;
    }
  }
};
