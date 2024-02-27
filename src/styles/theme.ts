const fontSizes = {
  headTitle: '1.125rem',
  subTitle: '0.875rem',
  nameTitle: '0.75rem',
  description: '0.625rem',
};

const colors = {
  lineColorGray: '#F1F1F1',
  primary: '#FFD233',
  textBlack: '#333333',
  textGray: '#B8B5AD',
  textEmphasis: '#754C29',
  white: '#FFFFFF',
  orange: '#FFB62A',
  gray100: '#F7F7F7',
  gray300: '#D9D9D9',
  textDarkGray: '#868686',
  red: '#FC5555',
};

const fontWeight = {
  bold: 900,
  semiBold: 700,
  medium: 500,
  regular: 300,
};

const fontStyles = {
  headingMd: `
    font-size:${fontSizes.headTitle};
    font-weight:${fontWeight.semiBold};
  `,
  textSemiboldMd: `
    font-size:${fontSizes.subTitle};
    font-weight:${fontWeight.semiBold};
  `,
  textSemiboldBase: `
    font-size:${fontSizes.nameTitle};
    font-weight:${fontWeight.semiBold};
  `,
  textSemiboldSm: `
    font-size:${fontSizes.description};
    font-weight:${fontWeight.semiBold};
  `,
  textMediumBase: `
    font-size:${fontSizes.nameTitle};
    font-weight:${fontWeight.medium};
  `,
  textRegularLd: `
    font-size:${fontSizes.headTitle};
    font-weight:${fontWeight.regular};
  `,
  textRegularMd: `
    font-size:${fontSizes.nameTitle};
    font-weight:${fontWeight.regular};
  `,
  textRegularSm: `
    font-size:${fontSizes.description};
    font-weight:${fontWeight.regular};
  `,
  textRegularBase: `
    font-size:${fontSizes.subTitle};
    font-weight:${fontWeight.regular};
  `,
};

const theme = {
  fontSizes,
  fontStyles,
  fontWeight,
  colors,
};

export default theme;
export type ThemeType = typeof theme;
