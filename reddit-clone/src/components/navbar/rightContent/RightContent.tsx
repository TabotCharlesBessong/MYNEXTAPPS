
import { Flex,Button } from '@chakra-ui/react'
import React from 'react'
import {AuthButtons, AuthModal,Icons} from '../../index'
import {signOut,User} from 'firebase/auth'
import { auth } from '@/src/firebase/clientApp'

type RightContentProps = {
  user?:User | null
}

const RightContent:React.FC<RightContentProps> = ({user}) => {
  return (
    <>
      <AuthModal/>
      <Flex justify='center' align='center' >
        {user ? <Icons/>:<AuthButtons/>  }
        
      </Flex>
    </>
  )
}

export default RightContent