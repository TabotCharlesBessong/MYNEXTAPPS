import { ClientOnly, Modal, Navbar, RegisterModal } from './components'
import './globals.css'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'AirBnB Clone',
  description: 'Real Estate App That connets Agent and Tenants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          {/* <Modal actionLabel='Submit' isOpen title='Hello my world' /> */}
          <RegisterModal/>
          <Navbar/>
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
