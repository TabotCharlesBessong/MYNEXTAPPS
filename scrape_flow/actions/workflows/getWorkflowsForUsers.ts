"use server"

import prisma from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"

export const getWorkflowsForUsers  = async () => {
  // const {userId} = auth()
  const user = await currentUser()
  if(!user){
    throw new Error("Unauthorized")
  }
  
  return prisma.workflow.findMany({
    where:{
      userId: user.id,
    },
    orderBy:{
      createdAt:"asc"
    }
  })
}