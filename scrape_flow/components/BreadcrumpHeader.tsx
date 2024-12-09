"use client"

import { usePathname } from 'next/navigation'
import React, { Fragment } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from './ui/breadcrumb'

const BreadcrumpHeader = () => {
  const pathName = usePathname()
  const paths = pathName === "/" ? [""] : pathName.split("/")
  return (
    <div className='flex items-center justify-start' >
      <Breadcrumb>
        <BreadcrumbList>{
          paths.map((path, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className='capitalize' href={`/${path}`} >
                  {path === "" ? "Home" : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))
        }</BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default BreadcrumpHeader