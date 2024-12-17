import React, { ReactNode } from 'react'

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  // check if user is authenticated
  return (
    <>
      {children}
    </>
  )
};

export default RootLayout