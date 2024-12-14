import { waitFor } from '@/lib/helper/waitFor'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import Editor from '../../_component/Editor'

const page = async ({params}:{params:{workflowId:string}}) => {
  const {workflowId} = params
  const user = await currentUser()
  if(!user) return <div>unauthorized</div>
  await waitFor(1000)
  const workflow = await prisma.workflow.findUnique({
    where:{
      id:workflowId,
      userId: user.id,
    }
  })

  if(!workflow){
    return <div>No workflow found</div>
  }
  return (
    <Editor workflow={workflow} />
  )
}

export default page