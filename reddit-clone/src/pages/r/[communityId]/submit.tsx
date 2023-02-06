// import Link from 'next/link'
import React from 'react'
import { NewPostForm, PageContent } from '@/src/components'
import { Box, Text } from '@chakra-ui/react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '@/src/firebase/clientApp'
import { useRecoilValue } from "recoil";
import {communityState} from '@/src/atoms/communitiesAtom'
import useCommunityData from "../../../hooks/useCommunityData";

const SubmitPostPage:React.FC = () => {
  const [user] = useAuthState(auth)
  const communityStateValue = useRecoilValue(communityState);
  const { loading } = useCommunityData();
  return (
    <PageContent>
      <>
        <Box p='14px 6px' borderBottom='1px solid white' >
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm communityId={communityStateValue.currentCommunity.id}
            communityImageURL={communityStateValue.currentCommunity.imageURL}
            user={user}  />}
      </>
      <></>
    </PageContent>
  )
}

export default SubmitPostPage