import React,{useState} from 'react'
import {Input,Button,Flex,Text} from '@chakra-ui/react'
import {useSetRecoilState} from 'recoil'
import { authModalState } from '@/src/atoms/authModalAtom'


const Signup:React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState)
  const [signupForm,setSignupForm] = useState({
    email:'',
    password:'',
    confirmPassword:''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm(prev => ({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  // firebase logic
  const handleSubmit = () => {}
  return (
    <form onSubmit={handleSubmit} >
      <Input required name='email' placeholder='email' type='email' mb={2} onChange={handleChange} fontSize='10pt' _placeholder={{
        color:'gray.500'
      }}
      _hover={{
        bg:'white',
        border:'1px solid',
        borderColor:'blue.500'
      }}
      _focus={{
        outline:'none',
        bg:'white',
        border:'1px solid',
        borderColor:'blue.500'
      }}
      
       />
      <Input required name='password' placeholder='password' type='password' onChange={handleChange} fontSize='10pt' _placeholder={{
        color:'gray.500'
      }}
      _hover={{
        bg:'white',
        border:'1px solid',
        borderColor:'blue.500'
      }}
      _focus={{
        outline:'none',
        bg:'white',
        border:'1px solid',
        borderColor:'blue.500'
      }}
      mb={2}
       />
       <Input required name='confirmPassword' placeholder='password' type='password' onChange={handleChange} fontSize='10pt' _placeholder={{
        color:'gray.500'
      }}
      _hover={{
        bg:'white',
        border:'1px solid',
        borderColor:'blue.500'
      }}
      _focus={{
        outline:'none',
        bg:'white',
        border:'1px solid',
        borderColor:'blue.500'
      }}
      mb={2}
       />
      <Button mt={2} mb={2} width='100%' height='36px' >Login</Button>

      <Flex>
        <Text mr={2} >Already A Redditor</Text>
        <Text onClick={() => setAuthModalState((prev) => ({
          ...prev,
          view:'login'
        }))} cursor='pointer' fontWeight={700} >Login</Text>
      </Flex>
    </form>
  )
}

export default Signup