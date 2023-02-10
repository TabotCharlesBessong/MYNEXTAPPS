import React,{useState} from 'react'
import {Input,Button,Flex,Text} from '@chakra-ui/react'
import {useSetRecoilState} from 'recoil'
import { authModalState } from '@/src/atoms/authModalAtom'
import { auth } from '@/src/firebase/clientApp'
import { FIREBASE_ERRORS } from '@/src/firebase/errors'
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'



const Login:React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState)
  const [loginForm,setLoginForm] = useState({
    email:'',
    password:''
  })

  // we use the firebase base hook library for react for the login 
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    userError
  ] = useSignInWithEmailAndPassword(auth)

  // since this is typescript , we have to use e:React.ChangeEvent<HTMLInputElement> for this particular element has the values will come from an html which is an input
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm(prev => ({
      // keep everything the same but change only the input element that has changed based on its target
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  // firebase logic
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // firebase handles everything
    signInWithEmailAndPassword(loginForm.email,loginForm.password)
  }
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
       <Text textAlign='center' color='red.600' >
         {FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
       </Text>
       
      <Button isLoading={loading} type='submit' mt={2} mb={2} width='100%' height='36px' >Login</Button>

      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={() => setAuthModalState((prev) => ({
          ...prev,
          view:'resetPassword'
        }))}
        >
          Reset
        </Text>
      </Flex>
      
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