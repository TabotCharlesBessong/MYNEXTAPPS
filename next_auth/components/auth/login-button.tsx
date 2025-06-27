"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

const LoginButton = ({children,mode="redirect",asChild}:LoginButtonProps) => {

  const router = useRouter()
  const onClick = () => {
    console.log("clicked the login button");
    router.push("/auth/login")
  }
  return (
    <span className='cursor-pointer' onClick={onClick} >
      {children}
    </span>
  )
}

export default LoginButton
