import React from 'react';
import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'
 
function MyApp({ Component,pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      {/* <Login/> */}
    </ChakraProvider>
  );
}


export default MyApp;
