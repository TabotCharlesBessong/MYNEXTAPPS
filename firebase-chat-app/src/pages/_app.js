import React from 'react';
import '../styles/globals.css'
import {Login} from '../components'
import {ChakraProvider} from '@chakra-ui/react'
 
function MyApp({ Component,pageProps }) {
  return (
    // <Component {...pageProps} />
    <ChakraProvider>
      <Login/>

    </ChakraProvider>
  );
}


export default MyApp;
