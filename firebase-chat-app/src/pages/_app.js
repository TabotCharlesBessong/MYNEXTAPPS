import React from 'react';
import '../styles/globals.css'
import {ChakraProvider,Spinner,Center} from '@chakra-ui/react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../firebase';
import {Login} from '../components'
 
function MyApp({ Component,pageProps }) {
  const [user,loading,error] = useAuthState(auth)
  console.log(error)

  if(loading) {
    return(
    <ChakraProvider>
      <Center h='100vh' >
        <Spinner size='xl' />
      </Center>
    </ChakraProvider>

    )
  }

  if(!user){
    return (
    <ChakraProvider>
		<Login />
    </ChakraProvider>

    )
  }
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}


export default MyApp;
