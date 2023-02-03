import { Button, Flex, Image, Text } from '@chakra-ui/react'
import {useSignInWithGoogle,useSignInWithGithub} from 'react-firebase-hooks/auth'
import { auth } from '@/src/firebase/clientApp'
import React from 'react'

const OAuthButtons:React.FC = () => {

  const [
    signInWithGoogle,
    user,
    loading,
    userError
  ] = useSignInWithGoogle(auth)

  const [
    signInWithGithub,
    userGithub,
    loadingGithub,
    userErrorGithub
  ] = useSignInWithGithub(auth)
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