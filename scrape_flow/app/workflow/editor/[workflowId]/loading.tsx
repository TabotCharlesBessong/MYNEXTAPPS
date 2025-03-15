import { Loader2Icon } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center' >
      <Loader2Icon size={80} className='animate-spin stroke-primary' />
    </div>
  )
}

export default Loading