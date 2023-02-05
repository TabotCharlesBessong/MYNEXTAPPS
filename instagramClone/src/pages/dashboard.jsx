
import {useEffect,useState} from 'react'
import { Header, Sidebar, Timeline } from '../components'

const Home = () => {

  useEffect(()=> {
    document.title = 'Instagram'
  },[])
  return(
    <div className='bg-gray-background'>
      <Header/>
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline/>
        <Sidebar/>
      </div>
    </div>
  )
}

export default Home