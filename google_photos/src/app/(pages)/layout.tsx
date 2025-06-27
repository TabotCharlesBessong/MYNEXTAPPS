import '@/app/globals.css';
import { Image } from 'lucide-react'

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SidebarLinks from '@/components/SidebarLinks';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Nav />
      <main className="grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-[12rem_auto]">
        <aside className="md:my-6">
          <SidebarLinks
            links={[
              {
                icon: <Image className="w-5 h-5" />,
                label: 'Photos',
                path: '/'
              }
            ]}
          />
        </aside>
        <div>{ children }</div>
      </main>
      <Footer />
    </div>
  )
}
