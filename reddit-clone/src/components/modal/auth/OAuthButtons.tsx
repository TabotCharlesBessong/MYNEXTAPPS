import { Button, Flex, Image, Text } from '@chakra-ui/react'
import {useSignInWithGoogle,useSignInWithGithub} from 'react-firebase-hooks/auth'
import { auth,firestore } from '@/src/firebase/clientApp'
import React,{useEffect} from 'react'
import {setDoc,doc} from 'firebase/firestore'

const OAuthButtons:React.FC = () => {

  const [
    signInWithGoogle,
    userCred,
    loading,
    userError
  ] = useSignInWithGoogle(auth)

  const [
    signInWithGithub,
    userGithub,
    loadingGithub,
    userErrorGithub
  ] = useSignInWithGithub(auth)

  const createUserDocumentGoogle = async(user:User) => {
    const googleUserDocRef = doc(firestore,"users",user.uid)
    await setDoc(googleUserDocRef,JSON.parse(JSON.stringify(user)))
  }

  const createUserDocumentGithub = async(user:User) => {
    const githubUserDocRef = doc(firestore,'users',user.uid)
    await setDoc(githubUserDocRef,JSON.parse(JSON.stringify(user)))
  }
 
  useEffect(()=>{
    if(userCred) createUserDocumentGoogle(userCred)
  },[userCred])

  useEffect(()=>{
    if(userGithub) createUserDocumentGithub(userGithub)
  },[userGithub])
  return (
    <Flex direction='column' width='100%' mb={4} >
      <Button isLoading={loading} onClick={() => signInWithGoogle()} variant='oauth' mb={3} display='flex' justifyContent='space-evenly' alignItems='center' >
        <Image mr={4} width={30} height={30} src='/images/googlelogo.png' alt='' />
        <Text>Continue With Google</Text>
      </Button>
      <Button isLoading={loadingGithub} onClick={() => signInWithGithub()}  variant='oauth' mb={3} display='flex' justifyContent='space-evenly' alignItems='center' >
        <Image mr={4} width={30} height={30} src='/images/githubLogo.png' alt='' />
        <Text>Continue With Github</Text>
      </Button>

      {userError && <Text>{userError.message}</Text>}
      {userErrorGithub && <Text>{userErrorGithub.message}</Text>}
    </Flex>
  )
}

export default OAuthButtons