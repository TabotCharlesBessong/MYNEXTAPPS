import { authModalState } from '@/src/atoms/authModalAtom'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import {Login, ResetPassword, Signup} from '../../index'

type AuthInputsProps = {

}

const AuthInputs:React.FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalState)
  return (
    <>
      <Flex direction='column' align='center' justify='center' width='100%' mt={4} >
        {
          modalState.view === 'login' ? <Login/> : modalState.view === 'signup' ? <Signup/>:<ResetPassword/>
        }
      </Flex>
    </>
  )
}

export default AuthInputs