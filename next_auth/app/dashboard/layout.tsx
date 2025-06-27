import React from 'react'

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex flex-col gap-y-4' >
      <nav className="bg-black text-white">
        This is a shared navigation bar
      </nav>
      {children}
    </div>
  )
}

export default DashboardLayout
