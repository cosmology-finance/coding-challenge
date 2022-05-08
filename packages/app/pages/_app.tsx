import { ChakraProvider } from '@chakra-ui/react';

function CosmologyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default CosmologyApp;
