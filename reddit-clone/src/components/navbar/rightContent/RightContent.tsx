
import { Flex } from '@chakra-ui/react'
import React from 'react'
import {AuthButtons} from '../../index'

type RightContentProps = {

}

const RightContent:React.FC<RightContentProps> = () => {
  return (
    <>
      <Flex justify='center' align='center' >
        <AuthButtons/>
      </Flex>
    </>
  )
}

export default RightContent