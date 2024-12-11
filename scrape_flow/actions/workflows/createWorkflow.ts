"use server"

import prisma from "@/lib/prisma"
import { createWorkfloeSchemaType, createWorkflowSchema } from "@/schema/workflow"
import { WorkflowStatus } from "@/types/workflow"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const CreateWorkflow = async (form:createWorkfloeSchemaType) => {
  const {success,data} = createWorkflowSchema.safeParse(form)
  if(!success){
    throw new Error("Invalid form data")
  }
  const user = await currentUser()
  if(!user){
    throw new Error("Unauthorized")
  }

  const result = await prisma.workflow.create({
    data:{
      userId:user.id,
      definition: "TODO",
      status:WorkflowStatus.DRAFT,
      ...data
    }
  })

  if(!result){
    throw new Error("Failed to create workflow")
  }

  redirect(`/workflow/edited/${result.id}`)
}