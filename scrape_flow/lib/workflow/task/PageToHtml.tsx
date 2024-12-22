"use client"

import { TaskParamTypes, TaskType } from '@/types/task'
import { CodeIcon, LucideProps } from 'lucide-react'
import React from 'react'

export const PageToHtmlTask = {
  type:TaskType.PAGE_TO_HTML,
  label:"Get html from page",
  icon:(props:LucideProps) => {
    <CodeIcon className='stroke-rose-400' {...props} />
  },
  isEntryPoint:false,
  inputs:[
    {
      name:"Page Url",
      types:TaskParamTypes.BROWSER_INSTANCE,
      required:true,
    }
  ],
  outputs:[
    {
      name:"HTML",
      types:TaskParamTypes.STRING,
      description:"The HTML content of the page",
    },
    {
      name:"Web Page",
      type:TaskParamTypes.BROWSER_INSTANCE
    }
  ]
}

const PageToHtml = () => {
  return (
    <div>PageToHtml</div>
  )
}

export default PageToHtml