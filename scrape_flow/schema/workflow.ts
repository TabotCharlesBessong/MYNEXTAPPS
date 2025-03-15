import {z} from 'zod'

export const createWorkflowSchema = z.object({
  name:z.string().min(3).max(50),
  description:z.string().max(80).optional(),
})

export type createWorkfloeSchemaType = z.infer<typeof createWorkflowSchema>