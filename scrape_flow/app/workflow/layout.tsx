import ModeToggle from '@/components/ThemeModeToggle'
import { SelectSeparator } from '@/components/ui/select'
import React, { ReactNode } from 'react'
import Logo from "@/components/Logo"

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='flex flex-col w-full h-screen' >
      {children}
      <SelectSeparator />
      <footer className="flex items-center justify-between p-2 pb-6 mb-4">
        <Logo iconSize={16} fontSize='text-xl' />
        <ModeToggle />
      </footer>
    </div>
  )
}

export default layout