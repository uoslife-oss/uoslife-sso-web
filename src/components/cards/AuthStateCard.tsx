import * as React from 'react';
import styled, { css } from 'styled-components';

import { ProfileResponse } from '@/models';

type Props = { state: ProfileResponse['state'] };

const messages: Record<Props['state'], string> = {
  verified: '구성원 인증이 완료되었습니다!',
  newbie: '구성원 인증을 위해 포털 연동이 필요합니다.',
  unverified: '원활한 서비스 이용을 위해 웹메일 인증을 해주세요.',
};

const AuthStateCard: React.FC<Props> = ({ state }) => (
  <Container state={state}>{messages[state]}</Container>
);

const Container = styled.div<{ state: string }>`
  ${({ theme }) => theme.typographies.Heading6};
  padding: 16px 24px;
  border: 1px solid ${({ theme }) => theme.colors.Secondary7};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.White};

  ${({ state, theme }) =>
    state === 'verified' &&
    css`
      background: linear-gradient(
        45deg,
        ${theme.colors.Success3},
        ${theme.colors.Success5}
      );
    `};

  ${({ state, theme }) =>
    state === 'newbie' &&
    css`
      background: linear-gradient(
        45deg,
        ${theme.colors.Info3},
        ${theme.colors.Info5}
      );
    `};

  ${({ state, theme }) =>
    state === 'unverified' &&
    css`
      background: linear-gradient(
        45deg,
        ${theme.colors.Warning3},
        ${theme.colors.Warning5}
      );
    `};
`;

export default AuthStateCard;
