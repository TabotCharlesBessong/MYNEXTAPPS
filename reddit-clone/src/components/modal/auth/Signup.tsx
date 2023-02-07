import React,{useState,useEffect} from 'react'
import {Input,Button,Flex,Text} from '@chakra-ui/react'
import {useSetRecoilState} from 'recoil'
import { authModalState } from '@/src/atoms/authModalAtom'
import { auth,firestore } from '@/src/firebase/clientApp'
import { FIREBASE_ERRORS } from '@/src/firebase/errors'
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {addDoc,collection} from 'firebase/firestore'
import { User } from 'firebase/auth'


const Signup:React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState)
  const [signupForm,setSignupForm] = useState({
    email:'',
    password:'',
    confirmPassword:''
  })

  const [error, setError] = useState('')

  const [
    createUserWithEmailAndPassword,
    userCreate,
    loading,
    userError
  ] = useCreateUserWithEmailAndPassword(auth)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm(prev => ({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  // firebase logic
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(signupForm.password,signupForm.confirmPassword)
    if(signupForm.password.length < 6){
      setError('Password should be at least 6 characters')
    }
    if(signupForm.password !== signupForm.confirmPassword){
      // set an error
      setError('Password do not match')
      // setSignupForm({
      //   password:'',
      //   confirmPassword:''
      // })
      return
    } 
     createUserWithEmailAndPassword(signupForm.email,signupForm.password)
    
  }

  const createUserDocument = async(user:User) => {
    await addDoc(collection(firestore,'users'),JSON.parse(JSON.stringify(user)))
  }

  useEffect(()=>{
    if(userCreate)  createUserDocument(userCreate.user)
  },[userCreate])
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
       {(error || userError) && (<Text color='red.300' >{error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}</Text>)}
      <Button type='submit' mt={2} mb={2} width='100%' height='36px' isLoading={loading} >Signup</Button>

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