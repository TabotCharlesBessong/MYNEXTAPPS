
import Navbar from '@/components/web/Navbar'
import React from 'react'

const SharedLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default SharedLayout