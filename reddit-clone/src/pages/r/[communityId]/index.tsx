
import React, { useEffect } from 'react'
import {doc,getDoc} from 'firebase/firestore'
import {GetServerSidePropsContext} from 'next'
import {firestore,auth} from '../../../firebase/clientApp'
import {Community, communityState} from '../../../atoms/communitiesAtom'
import safeJsonStringify from "safe-json-stringify"
import {NotFound,Header,PageContent, CreatePostLink,Post, About} from '../../../components'
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from 'recoil'

type CommunityPageProps = {
  communityData:Community
}

const CommunityPage:React.FC<CommunityPageProps> = ({communityData})=> {
  const [user, loadingUser] = useAuthState(auth);
  const setCommunityStateValue = useSetRecoilState(communityState)
  if(!communityData){
    return <NotFound/>
  }

  useEffect(()=>{
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity:communityData
    }))
  },[communityData, setCommunityStateValue])
  return(
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink/>
          <Post communityData={communityData}
            userId={user?.uid}
            loadingUser={loadingUser} />
        </>
        <>
        <About communityData={communityData} />
        </>
      </PageContent>
    </>
  )
}

export async function getServerSideProps(context:GetServerSidePropsContext){
  // get community data
  try{
    const communityDocRef = doc(firestore,"communities",context.query.communityId as String)
    const communityDoc = await getDoc(communityDocRef)
    return {
      props:{
        communityData:communityDoc.exists() ?  JSON.parse(safeJsonStringify({id:communityDoc.id, ...communityDoc.data()})) : '',
      },
    }
  }catch (error){
    console.log('Get Props Server side error',error)
  }
}
export default CommunityPage
