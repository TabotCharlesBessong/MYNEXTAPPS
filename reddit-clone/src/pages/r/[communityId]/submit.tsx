import Link from 'next/link'
import React from 'react'
import { NewPostForm, PageContent } from '@/src/components'
import { Box, Text } from '@chakra-ui/react'

const SubmitPostPage:React.FC = () => {
  return (
    <PageContent>
      <>
        <Box p='14px 6px' borderBottom='1px solid white' >
          <Text>Create a post</Text>
        </Box>
        <NewPostForm/>
      </>
      <></>
    </PageContent>
  )
}

export default SubmitPostPage