import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/Link'
import { Inter } from '@next/font/google'
import { Header } from '../components'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div>
        <Header/>
      </div>
    </>
  )
}
