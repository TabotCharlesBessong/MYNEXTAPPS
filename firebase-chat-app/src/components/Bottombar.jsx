import React from 'react'
import { FormControl,Input,Button,Flex } from '@chakra-ui/react'

const Bottombar = () => {
  return (
    <Flex justify='center' align='center' maxWidth='500px' mb={4} p={3} >
      <FormControl p={3} bg='blue.300' h='61px' >
        <Input placeholder='type a message' />
        <Button type='submit' hidden ></Button>
      </FormControl>
    </Flex>
  )
}

export default Bottombar