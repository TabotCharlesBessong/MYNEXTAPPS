
import React from 'react'
import Image from 'next/image'
import img1 from '../public/images/img1.jpg'
import Link from 'next/Link'
import {Author} from '../components'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css'
import SwiperCore , {Autoplay} from 'swiper'

const Section1 = () => {

	SwiperCore.use([Autoplay])

	const bg = {
		background:"url('/images/banner.png') no-repeat",
		backgroundPosition:"right"
	}

  return (
    <section className="py-16" style={bg} >
      <div className='container mx-auto md:px-20' >
        <h1 className='text-bold text-4xl pb-12 text-center' >Trending</h1>
				<Swiper
				sliderPerView={1}
				loop={true}
				autoplay={{
					delay:6000,
					disableOnInteraction: false
				}}
				>
					<SwiperSlide>{Slide() }</SwiperSlide>
					<SwiperSlide>{Slide() }</SwiperSlide>
					<SwiperSlide>{Slide() }</SwiperSlide>
					<SwiperSlide>{Slide() }</SwiperSlide>
					<SwiperSlide>{Slide() }</SwiperSlide>
					<SwiperSlide>{Slide() }</SwiperSlide>
				</Swiper>
        {/* <Slide/> */}
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
				  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
				</p>
				<Author/>
			</div>
		</div>
	);
}

export default Section1