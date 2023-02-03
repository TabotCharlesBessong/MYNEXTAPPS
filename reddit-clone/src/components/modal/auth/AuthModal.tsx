import { authModalState } from '@/src/atoms/authModalAtom'
import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { auth } from '@/src/firebase/clientApp'
import React,{useEffect} from 'react'
import { useRecoilState } from 'recoil'
import {AuthInputs, OAuthButtons} from '../../index'
import {useAuthState} from 'react-firebase-hooks/auth'

const AuthModal:React.FC = () => {
  const [modalState,setModalState] = useRecoilState(authModalState)
  const [user,loading,error] = useAuthState(auth)

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open:false
    }))
  }

  useEffect(()=>{
    if(user){
      handleClose()
    }
    console.log('user',user)
  },[user])

  return (
    <>

      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center' >{modalState.view === 'login' ? 'Login' : modalState.view === 'signup' ? 'Sign Up' : 'Reset Password' }</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center' >
            <Flex direction='column' align='center' justify='center' width='70%' >
              <OAuthButtons/>
              <Text fontWeight={700} textAlign='center' display='flex' alignItems='center' justifyContent='center' color='gray.400' width={50} height={50} borderRadius={50} border='2px solid' borderColor='#444' >OR</Text>
              <AuthInputs/>
            </Flex>
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthModal