
import Image from "next/image"
import Link from "next/Link"
import author1 from '../../public/images/author/author1.jpg'

const Author = () => {
  return (
    <div className="auto flex py-5" >
      <Image 
        src={author1} className='rounded-full' width={60} height={60} alt={""}
      />
      <div className='flex flex-col justify-center px-4'>
        <Link className="text-md font-bold text-gray-800 hover:text-gray-600" href={'/'}>Charles</Link>
        <span className="text-sm text-gray-500">CEO & Founder</span>
      </div>
    </div>
  )
}

export default Author
