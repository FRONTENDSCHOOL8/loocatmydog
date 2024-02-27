import GlobalStyles from './../src/styles/GlobalStyles';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import theme from './../src/styles/theme';

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      theme,
    },
    Provider: ThemeProvider,
    GlobalStyles,
  }),
];
