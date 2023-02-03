import { authModalState } from '@/src/atoms/authModalAtom'
import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import {AuthInputs} from '../../index'

const AuthModal:React.FC = () => {
  const [modalState,setModalState] = useRecoilState(authModalState)

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open:false
    }))
  }

  return (
    <>

      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center' >{modalState.view === 'login' ? 'Login' : modalState.view === 'signup' ? 'Sign Up' : 'Reset Password' }</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center' >
            <Flex direction='column' align='center' justify='center' width='70%' >
              <AuthInputs/>
            </Flex>
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthModal