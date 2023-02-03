import { Button } from '@chakra-ui/react'
import React from 'react'


const AuthButtons:React.FC = () => {
  return (
    <>
      <Button variant='outline' height='28px' display={{
        base:'none',sm:'flex'
      }} width={{
        base:'70px',md:'118px'
      }} mr={2} onClick={()=>console.log('hello')} >Log In</Button>
      <Button display={{
        base:'none',sm:'flex'
      }} width={{
        base:'70px',md:'118px'
      }} height='28px' onClick={()=>console.log('hello')} >Sign Up</Button>
    </>
  )
}

export default AuthButtons