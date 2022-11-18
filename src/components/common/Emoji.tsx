import * as React from 'react';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

type Props = PropsWithChildren & {
  size?: number;
};

const Emoji: React.FC<Props> = ({ size, children }) => {
  return <TossFaceEmoji size={size}>{children}</TossFaceEmoji>;
};

const TossFaceEmoji = styled.span<Props>`
  font-family: 'Tossface', 'Pretendard', sans-serif;

  ${({ size }) => size && `font-size: ${size}px`};
`;

export default Emoji;
