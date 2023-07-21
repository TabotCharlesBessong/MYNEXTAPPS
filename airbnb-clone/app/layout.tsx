import { Nunito } from 'next/font/google'
import { ClientOnly, Navbar, RegisterModal,LoginModal } from './components'
import './globals.css'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

const nunito = Nunito({ subsets: ['latin'] })   



export const metadata = {
  title: 'AirBnB Clone',
  description: 'Real Estate App That connets Agent and Tenants',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
