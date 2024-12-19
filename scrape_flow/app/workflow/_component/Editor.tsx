"use client"

import { Workflow } from '@prisma/client'
import React from 'react'
import {ReactFlowProvider} from "@xyflow/react"
import FlowEditor from './FlowEditor'
import Topbar from './topbar/Topbar'

const Editor = ({workflow}:{workflow:Workflow}) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <Topbar workflowId={workflow.id} title='Workflow Editor' subtitle={workflow.name} />
        <section className='flex h-full overflow-auto' >
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  )
}

export default Editor