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
  ]
}

const PageToHtml = () => {
  return (
    <div>PageToHtml</div>
  )
}

export default PageToHtml