
import React from 'react'
import {doc} from 'firebase/firestore'
import {GetServerSidePropsContext} from 'next'
import {firestore} from '../../../firebase/clientApp'
import {Community} from '../../../atoms/communitiesAtom'
import safeJsonStringify from "safe-json-stringify"

type CommunityPageProps = {
  communityData:Community
}

const CommunityPage:React.FC<CommunityPageProps> = ({communityData})=> {
  return(
    <div> Welcome to {communityData.id} </div>
  )
}

export async function getServerSideProps(context:GetServerSidePropsContext){
  // get community data
  try{
    const communityDocRef = doc(firestore,"communities",context.query.communityId as String)
    const communityDoc = await getDoc(communityDocRef)
    return {
      props:{
        communityData:JSON.parse(safeJsonStringify({id:communityDoc.id, ...communityDoc.data()})),
      },
    }
  }catch (error){
    console.log('Get Props Server side error',error)
  }
}
export default CommunityPage
