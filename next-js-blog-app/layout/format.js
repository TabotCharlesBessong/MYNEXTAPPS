
import React from 'react'
import Head from "next/head";
import { Footer, Header } from '../components'

const Format = ({children}) => {
  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default Format
