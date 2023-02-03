import React,{useState} from 'react'
import {Input,Button,Flex,Text} from '@chakra-ui/react'
import {useSetRecoilState} from 'recoil'
import { authModalState } from '@/src/atoms/authModalAtom'

type LoginProps = {

}

const Login:React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState)
  const [loginForm,setLoginForm] = useState({
    email:'',
    password:''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm(prev => ({
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
      <Button mt={2} mb={2} width='100%' height='36px' >Login</Button>

      <Flex>
        <Text mr={2} >New Here</Text>
        <Text onClick={() => setAuthModalState((prev) => ({
          ...prev,
          view:'signup'
        }))} cursor='pointer' fontWeight={700} >Sign up</Text>
      </Flex>
    </form>
  )
}

export default Login