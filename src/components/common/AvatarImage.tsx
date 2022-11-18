import * as React from 'react';
import styled from 'styled-components';

type Props = {
  src?: string;
  size: number;
};

const AvatarImage: React.FC<Props> = ({ src, size }) => {
  return (
    <Image
      src={src ? src : '/fallback_avatar.png'}
      size={size}
      height={size}
      width={size}
    />
  );
};

const Image = styled.img<Props>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  border: 1px solid ${({ theme }) => theme.colors.Secondary7};
`;

export default AvatarImage;
