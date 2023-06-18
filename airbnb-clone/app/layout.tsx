import { Nunito } from 'next/font/google'
import { ClientOnly, Navbar, RegisterModal } from './components'
import './globals.css'
import ToasterProvider from './providers/ToasterProvider'

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
          <ToasterProvider/>
          <RegisterModal/>
          <Navbar/>
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
