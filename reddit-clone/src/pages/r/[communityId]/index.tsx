
import React from 'react'
import {doc,getDoc} from 'firebase/firestore'
import {GetServerSidePropsContext} from 'next'
import {firestore} from '../../../firebase/clientApp'
import {Community} from '../../../atoms/communitiesAtom'
import safeJsonStringify from "safe-json-stringify"
import {NotFound,Header,PageContent, CreatePostLink} from '../../../components'

type CommunityPageProps = {
  communityData:Community
}

const CommunityPage:React.FC<CommunityPageProps> = ({communityData})=> {
  if(!communityData){
    return <NotFound/>
  }
  return(
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink/>
        </>
        <>
        <div>RHS</div>
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
