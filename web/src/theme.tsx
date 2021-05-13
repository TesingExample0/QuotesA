import { extendTheme } from '@chakra-ui/react';

const config = {
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    black: '#16161D',
    yellow: '#FCD307',
    blue: '#0F5D75',
    darkGray: '#7F7F7F',
  },
  fonts: {
    body: "'My Body Font', sans-serif",
    heading: "'My Heading Font', sans-serif",
    mono: "'Menlo', monospace",
  },
});

export default theme;
