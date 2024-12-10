import UserWorkflows from '@/components/workflows/UserWorkflows'
import UserWorkflowsSkeleton from '@/components/workflows/UserWorkflowsSkeleton'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div className='flex flex-1 flex-col h-full' >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-black">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
      </div>
      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />} >
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  )
}

export default page