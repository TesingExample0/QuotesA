import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../style.css';

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
