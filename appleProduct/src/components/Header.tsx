import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header>
      <div>
        <Image src='https://rb.gy/vsvv2o' width={50} height={50} alt='' layout='fill' objectFit='contain' />
      </div>
    </header>
  )
}

export default Header