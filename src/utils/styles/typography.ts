import { css } from 'styled-components';

export const HEADING_FONT = 'Pretendard, sans-serif';
export const BODY_FONT = 'Pretendard, sans-serif';

const TYPOGRAPHY_CONFIG = {
  Heading1: css`
    margin: 0;
    font-family: ${HEADING_FONT};
    font-size: 36px;
    font-weight: 700;
    line-height: 1.5;
  `,
  Heading2: css`
    margin: 0;
    font-family: ${HEADING_FONT};
    font-size: 32px;
    font-weight: 700;
    line-height: 1.5;
  `,
  Heading3: css`
    margin: 0;
    font-family: ${HEADING_FONT};
    font-size: 28px;
    font-weight: 700;
    line-height: 1.5;
  `,
  Heading4: css`
    margin: 0;
    font-family: ${HEADING_FONT};
    font-size: 24px;
    font-weight: 700;
    line-height: 1.5;
  `,
  Heading5: css`
    margin: 0;
    font-family: ${HEADING_FONT};
    font-size: 20px;
    font-weight: 700;
    line-height: 1.5;
  `,
  Heading6: css`
    margin: 0;
    font-family: ${HEADING_FONT};
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
  `,
  Body1: css`
    font-family: ${BODY_FONT};
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
  `,
  Body2: css`
    font-family: ${BODY_FONT};
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
  `,
  Body3: css`
    font-family: ${BODY_FONT};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  `,
};

export const typographies = TYPOGRAPHY_CONFIG;
