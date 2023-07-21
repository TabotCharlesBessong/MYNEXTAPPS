
'use client'

import React from "react";
import {Container,Logo, Search,UserMenu} from '../index'
import {User} from '@prisma/client'

interface NavbarProps {
  currentUser?: User | null
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  console.log({currentUser})
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm" >
      <div className="py-4 border-b-[1px]">

      </div>
      <Container>
        <div className="flex flex-grow items-center justify-between gap-3 md:gap-0">

        </div>
        <Logo/>
        <Search/>
        <UserMenu/>
      </Container>
    </div>
  )
};

export default Navbar;
