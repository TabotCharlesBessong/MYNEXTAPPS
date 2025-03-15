"use client"

import React, { ReactNode } from 'react'

const NodeInputs = ({children}:{children:ReactNode}) => {
  return (
    <div className='flex flex-col divide-y' >
      {children}
    </div>
  )
}

export default NodeInputs