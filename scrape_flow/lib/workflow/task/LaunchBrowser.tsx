"use client"

import { TaskParamTypes, TaskType } from '@/types/task'
import { WorkflowTask } from '@/types/workflow'
import { GlobeIcon, LucideProps } from 'lucide-react'
import React from 'react'

export const LaunchBrowserTask = {
  type:TaskType.LAUNCH_BROWSER,
  label:"Launch Browser",
  icon:(props:LucideProps) => (
    <GlobeIcon className='stroke-pink-400' {...props} />
  ),
  isEntryPoint:true,
  credits:5,
  inputs:[
    {
      name:"Website Url",
      type:TaskParamTypes.STRING,
      helperText:"e.g https://www.google.com",
      required:true,
      hideHandle:true
    }
  ],
  outputs:[
    {
      name:"Web Page",
      type:TaskParamTypes.BROWSER_INSTANCE
    }
  ]
} satisfies WorkflowTask

const LaunchBrowser = () => {
  return (
    <div>LaunchBrowser</div>
  )
}

export default LaunchBrowser