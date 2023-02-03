
import { Flex,Button } from '@chakra-ui/react'
import React from 'react'
import {AuthButtons, AuthModal} from '../../index'
import {signOut} from 'firebase/auth'
import { auth } from '@/src/firebase/clientApp'

type RightContentProps = {
  user:any
}

const RightContent:React.FC<RightContentProps> = ({user}) => {
  return (
    <>
      <AuthModal/>
      <Flex justify='center' align='center' >
        {user ? <Button onClick={() => signOut(auth)} >Logout</Button>:<AuthButtons/>  }
        
      </Flex>
    </>
  )
}

export default RightContent