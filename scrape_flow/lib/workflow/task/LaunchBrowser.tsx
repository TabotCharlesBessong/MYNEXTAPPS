"use client"

import { TaskType } from '@/types/task'
import { GlobeIcon, LucideProps } from 'lucide-react'
import React from 'react'

export const LaunchBrowserTask = {
  type:TaskType.LAUNCH_BROWSER,
  label:"Launch Browser",
  icon:(props:LucideProps) => (
    <GlobeIcon className='stroke-pink-400' {...props} />
  ),
  isEnteryPoint:true
}

const LaunchBrowser = () => {
  return (
    <div>LaunchBrowser</div>
  )
}

export default LaunchBrowser