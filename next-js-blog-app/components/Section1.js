
import React from 'react'
import Image from 'next/image'
import img1 from '../public/images/img1.jpg'
import Link from 'next/Link'
import {Author,Spinner} from '../components'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css'
import SwiperCore , {Autoplay} from 'swiper'
import fetcher from '../utility/fetcher'

const Section1 = () => {
	const { data, isLoading, isError } = fetcher("api/trending");

	// if(data) console.log(data);
	if (isLoading) return <Spinner />;
	if (isError) return <div>error</div>;

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
					{data.map((value, index) => (
						<SwiperSlide key={index}>
							<Slide data={value} />
						</SwiperSlide>
					))}
				</Swiper>
        {/* <Slide/> */}
      </div>
    </section>
  )
}

const Slide = ({data}) => {
	const { id, category, img, published, author, description, title, subtitle } =
		data;
  return (
		<div className="grid md:grid-cols-2 gap-2">
			<div className="images">
				<Link href={"/"}>
					<Image src={img} width={600} height={600} alt={"Image 1"} />
				</Link>
			</div>
			<div className="info flex justify-center flex-col">
				<div className="cat">
					<Link className="text-orange-600 hover:text-orange-800" href={"/"}>
						{category || "Unknown category"}
					</Link>
					<Link className="text-gray-800 hover:text-gray-600" href={"/"}>
						{published || "Published"}
					</Link> 
				</div>
        <div className="title">
          <Link href={'/'} className='text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600' >
            {title || "unknown title"}
          </Link>
        </div>
				<p className='text-gray-500 py-3' >
				  {subtitle || "unknown"}
				</p>
				{author ? <Author/> : '' }
			</div>
		</div>
	);
}

export default Section1