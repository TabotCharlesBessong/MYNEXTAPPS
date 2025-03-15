"use client"

import { ParamProps } from '@/types/appNode'
import React from 'react'

const BrowserInstanceParam = ({param}:ParamProps) => {
  return (
    <div>
      {param.name}
    </div>
  )
}

export default BrowserInstanceParam