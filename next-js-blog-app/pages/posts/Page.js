
import Format from '../../layout/format'
import {Author,Related} from '../../components'
import Image from 'next/image'
import img1 from '../../public/images/img1.jpg'

const Page = () => {
  return (
    <Format>
      <section className="container mx-auto px-2 py-16 w-1/2">
        <div className='flex justify-center' >
          <Author/>
        </div>
        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum est officia ipsam magni quaerat.
          </h1>
          <p className='text-gray-500 text-xl text-center' >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae nesciunt hic voluptates esse explicabo iusto vero perspiciatis tempora, deleniti laboriosam, dolores qui blanditiis quidem cupiditate magni debitis ex! Odit et omnis ex repellat? Fugit nostrum repellat culpa cupiditate recusandae quos veritatis pariatur tenetur tempora unde illo, iure ab delectus! Eos?
          </p>
          <div className="py-10">
            <Image
              src={img1}
              width={900}
              height={600}
            />
          </div>

          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, cupiditate numquam.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, cupiditate numquam.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, cupiditate numquam.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, cupiditate numquam.</p>  
          </div>
        </div>
        <Related/>
      </section>
    </Format>
  )
}

export default Page