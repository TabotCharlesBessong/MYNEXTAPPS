
import React,{useState} from 'react'
import {Flex,Icon,MenuItem,Text,Box} from '@chakra-ui/react'
import {CreateCommunityModal,MenuListItem} from '../../index'
import {GrAdd} from 'react-icons/gr'
import {FaReddit} from 'react-icons/fa'
import { communityState } from '@/src/atoms/communitiesAtom'
import {useRecoilValue} from "recoil"

type CommunitiesProps = {

}

const Communities:React.FC<CommunitiesProps> = () => {
  const [open,setOpen] = useState(false)
  const mySnippets = useRecoilValue(communityState).mySnippets
  console.log(mySnippets)
  return(
    <>
      <CreateCommunityModal isOpen={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4} >
        <Text pl={3} mb={1} fontSize='7pt' fontWeight={500} color='gray.100' >Moderating</Text>
        {
          mySnippets.filter(snippet => snippet.isModerator).map((snippet) =>  (
            <MenuListItem 
              key={snippet.communityId}
              icon={FaReddit}
              displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`}
              iconColor="blue.500"
              imageURL={snippet.imageURL}
            />
          ))
        }
      </Box>

      <Box mt={3} mb={4} >
        <Text pl={3} mb={1} fontSize='7pt' fontWeight={500} color='gray.100' >My Communities</Text>
        <MenuItem width='100%' fontSize='10pt' _hover={{
          bg:'gray.100'
        }} onClick={() => setOpen(true)} >
          <Flex align='center' >
            <Icon fontSize={20} mr={2} as={GrAdd} />
            <Text>Create a Community</Text>
          </Flex>
        </MenuItem>
        {
          mySnippets.map((snippet) =>  (
            <MenuListItem 
              key={snippet.communityId}
              icon={FaReddit}
              displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`}
              iconColor="blue.500"
              imageURL={snippet.imageURL}
            />
          ))
        }
      </Box>
    </>
  )
}

export default Communities

