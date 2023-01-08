import Image from 'next/image'
import Link from 'next/Link'
import { Inter } from '@next/font/google'


// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="flex justify-center">
      <h1 className="text-6xl text-orange-700">
        Hello my world do you wanna rock it
      </h1>
    </div>
  )
}
