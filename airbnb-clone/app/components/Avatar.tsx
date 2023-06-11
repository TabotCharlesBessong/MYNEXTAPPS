
'use client'

import React from "react";
import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      className="rounded-full"
      width="30"
      height="30"
      alt="Avatar"
      src="/images/placeholder.jpg"
    />
  )
};

export default Avatar;
