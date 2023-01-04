import Image from 'next/image'
import Link from 'next/Link'
import { Inter } from '@next/font/google'
import Format from '../layout/format'
import { Section1 , Section2 } from '../components'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Format>
      <Section1/>
      <Section2/>
    </Format>
  )
}
