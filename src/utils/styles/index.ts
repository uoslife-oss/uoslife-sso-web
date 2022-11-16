import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { colors } from '@/utils/styles/colors';
import { typographies } from '@/utils/styles/typography';

export const GlobalStyle = createGlobalStyle`
  ${normalize};
  
  * {
    ${typographies.Body2};
    color: ${colors.Secondary2};
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  
  h1 {
    ${typographies.Heading1};
  }
  
  h2 {
    ${typographies.Heading2};
  }
  
  h3 {
    ${typographies.Heading3};
  }
  
  h4 {
    ${typographies.Heading4};
  }
  
  h5 {
    ${typographies.Heading5};
  }
  
  h6 {
    ${typographies.Heading6};
  }
  
  strong, a {
    font-weight: 700;
    font-size: inherit;
    font-family: inherit;
  }
  
  a:hover {
    text-decoration: underline;
  }
`;

export interface Theme {
  colors: typeof colors;
  typographies: typeof typographies;
}

export const theme: Theme = { colors, typographies };

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
