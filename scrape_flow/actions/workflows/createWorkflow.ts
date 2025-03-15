"use server"

import { AppNode } from '@/types/appNode';
import prisma from "@/lib/prisma"
import { CreateFlowNode } from "@/lib/workflow/createFlowNode"
import { createWorkfloeSchemaType, createWorkflowSchema } from "@/schema/workflow"
import { TaskParamTypes, TaskType } from "@/types/task"
import { WorkflowStatus } from "@/types/workflow"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Edge } from '@xyflow/react';

export const CreateWorkflow = async (form:createWorkfloeSchemaType) => {
  const {success,data} = createWorkflowSchema.safeParse(form)
  if(!success){
    throw new Error("Invalid form data")
  }
  const user = await currentUser()
  if(!user){
    throw new Error("Unauthorized")
  }

  const initialFlow : {nodes:AppNode[];edges:Edge[]} = {
    nodes:[],
    edges:[]
  }

  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

  const result = await prisma.workflow.create({
    data:{
      userId:user.id,
      definition: JSON.stringify(initialFlow),
      status:WorkflowStatus.DRAFT,
      ...data
    }
  })

  if(!result){
    throw new Error("Failed to create workflow")
  }

  redirect(`/workflow/editor/${result.id}`)
}