import { Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const OAuthButtons:React.FC = () => {
  return (
    <Flex direction='column' width='100%' mb={4} >
      <Button variant='oauth' mb={3} display='flex' justifyContent='space-evenly' alignItems='center' >
        <Image mr={4} width={30} height={30} src='/images/googlelogo.png' alt='' />
        <Text>Continue With Google</Text>
      </Button>
      <Button variant='oauth' mb={3} display='flex' justifyContent='space-evenly' alignItems='center' >
        <Image mr={4} width={30} height={30} src='/images/githubLogo.png' alt='' />
        <Text>Continue With Github</Text>
      </Button>
    </Flex>
  )
}

export default OAuthButtons