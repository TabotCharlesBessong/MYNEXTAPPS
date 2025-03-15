"use server"

import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const deleteWorkflow = async (id:string) => {
  const user = await currentUser()
  if(!user){
    throw new Error("Unauthorized")
  }

  await prisma.workflow.delete({
    where:{
      id,
      userId: user.id,
    }
  })

  revalidatePath("/workflows")
}