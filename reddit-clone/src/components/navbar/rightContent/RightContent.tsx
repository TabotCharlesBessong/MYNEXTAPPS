
import { Flex,Button } from '@chakra-ui/react'
import React from 'react'
import {AuthButtons, AuthModal,Icons, UserMenu} from '../../index'
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
        <UserMenu user={user} />
      </Flex>
    </>
  )
}

export default RightContent