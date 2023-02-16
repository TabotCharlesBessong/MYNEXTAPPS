
import dynamic from "next/dynamic";
import {Sidebar} from '../components'
import {Box} from '@chakra-ui/react'

const  Home= () =>{
  return (
    <Box h='100vh'>
      <Sidebar />
    </Box>
  );
}

export default dynamic(() => Promise.resolve(Home),{ssr:false})

