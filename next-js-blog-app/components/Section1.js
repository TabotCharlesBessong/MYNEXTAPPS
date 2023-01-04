
import React from 'react'
import Image from 'next/image'
import img1 from '../public/images/img1.jpg'
import Link from 'next/Link'

const Section1 = () => {
  return (
    <section className="py-16">
      <div className='container mx-auto md:px-20' >
        <h1 className='text-bold text-4xl pb-12 text-center' >Trending</h1>
        <Slide/>
      </div>
    </section>
  )
}

const Slide = () => {
  return (
		<div className="grid md:grid-cols-2">
			<div className="Image">
				<Link href={"/"}>
					<Image src={img1} width={600} height={600} alt={"Image 1"} />
				</Link>
			</div>
			<div className="Info flex justify-center flex-col">
				<div className="cat">
					<Link className="text-orange-600 hover:text-orange-800" href={"/"}>
						Business
					</Link>
					<Link className="text-gray-800 hover:text-gray-600" href={"/"}>
						September 29 2011
					</Link> 
				</div>
        <div className="title">
          <Link href={'/'} className='text-3xl' >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Link>
        </div>
				<p className='text-gray-500 py-3' >
				  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
				</p>
				<h1 className="author">Charles</h1>
			</div>
		</div>
	);
}

export default Section1