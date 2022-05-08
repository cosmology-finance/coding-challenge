import { ChakraProvider } from '@chakra-ui/react';
// @ts-ignore
import { defaultTheme } from '@cosmology/react';

function CosmologyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default CosmologyApp;
