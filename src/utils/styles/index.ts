import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { colors } from '@/utils/styles/colors';
import { typographies } from '@/utils/styles/typography';

export const theme = { ...colors, ...typographies };

export const GlobalStyle = createGlobalStyle`
  ${normalize};
  
  * {
    ${typographies.Body2};
    margin-top: 0;
    color: ${colors.Secondary1};
    
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
