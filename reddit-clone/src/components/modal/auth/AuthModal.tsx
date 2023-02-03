import { authModalState } from '@/src/atoms/authModalAtom'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'

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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora reprehenderit temporibus atque, nisi similique odio quidem autem corporis suscipit fugit.</h1>
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthModal