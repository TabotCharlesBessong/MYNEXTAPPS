import React from 'react';
import '../styles/globals.css'
import {Login, Sidebar} from '../components'
import {ChakraProvider} from '@chakra-ui/react'
 
function MyApp({ Component,pageProps }) {
  return (
    // <Component {...pageProps} />
    <ChakraProvider>
      {/* <Login/> */}
      <Sidebar/>

    </ChakraProvider>
  );
}


export default MyApp;
