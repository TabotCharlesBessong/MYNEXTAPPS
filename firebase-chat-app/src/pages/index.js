
import dynamic from "next/dynamic";
import {Sidebar} from '../components'
import {Box} from '@chakra-ui/react'
import Head from "next/head";

const  Home= () =>{
  return (
    <>
      <Head>
        <title>FIREBASE CHAT APP</title>
      </Head>
      <Box h='100vh'>
        <Sidebar />
      </Box>
      
    </>
  );
}

export default dynamic(() => Promise.resolve(Home),{ssr:false})

