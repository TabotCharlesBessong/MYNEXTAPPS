"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import CustomDialogHeader from '../../../../components/workflows/CustomDialogHeader'
import { Layers2Icon } from 'lucide-react'

const CreateWorkflowDialog = ({triggerText}:{triggerText?:string}) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild >
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className='px-0' >
        <CustomDialogHeader icon={Layers2Icon} title='Create workflow' subtitle='Start building your workflow' />
      </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflowDialog