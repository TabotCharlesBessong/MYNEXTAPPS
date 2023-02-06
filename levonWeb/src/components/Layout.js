import React from 'react'
import {Navbar} from './index'


const Layout = ({children}) => {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
      
    </>
  )
}

export default Layout