"use server";

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const UpdateWorkflow = async ({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) => {
  const user = await currentUser();
  if (!user) throw new Error("unauthorized");

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!workflow) throw new Error("workflow not found");
  if (workflow.status !== WorkflowStatus.DRAFT)
    throw new Error("workflow is not draft");

  await prisma.workflow.update({
    data:{
      definition,
    },
    where: {
      id,
      userId: user.id,
    },
  })

  revalidatePath("/workflows")
};
