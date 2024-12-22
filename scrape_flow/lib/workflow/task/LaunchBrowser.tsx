"use client"

import { TaskParamTypes, TaskType } from '@/types/task'
import { GlobeIcon, LucideProps } from 'lucide-react'
import React from 'react'

export const LaunchBrowserTask = {
  type:TaskType.LAUNCH_BROWSER,
  label:"Launch Browser",
  icon:(props:LucideProps) => (
    <GlobeIcon className='stroke-pink-400' {...props} />
  ),
  isEnteryPoint:true,
  inputs:[
    {
      name:"Website Url",
      types:TaskParamTypes.STRING,
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
}

const LaunchBrowser = () => {
  return (
    <div>LaunchBrowser</div>
  )
}

export default LaunchBrowser