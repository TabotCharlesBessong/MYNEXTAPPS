"use client"

import { TaskParamTypes, TaskType } from '@/types/task'
import { WorkflowTask } from '@/types/workflow'
import { CodeIcon, LucideProps } from 'lucide-react'
import React from 'react'

export const PageToHtmlTask = {
  type:TaskType.PAGE_TO_HTML,
  label:"Get html from page",
  icon:(props:LucideProps) => (
    <CodeIcon className='stroke-rose-400' {...props} />
  ),
  isEntryPoint:false,
  credits:3,
  inputs:[
    {
      name:"Web Page",
      type:TaskParamTypes.STRING,
      required:true,
    }
  ],
  outputs:[
    {
      name:"HTML",
      type:TaskParamTypes.STRING,
      description:"The HTML content of the page",
    },
    {
      name:"Web Page",
      type:TaskParamTypes.BROWSER_INSTANCE
    }
  ]
} satisfies WorkflowTask

const PageToHtml = () => {
  return (
    <div>PageToHtml</div>
  )
}

export default PageToHtml