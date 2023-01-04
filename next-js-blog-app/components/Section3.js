
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Autoplay } from "swiper";
import Link from "next/Link";
import { Author } from "../components";
import img2 from "../public/images/img2.jpg";
import img1 from "../public/images/img1.jpg";
import img3 from "../public/images/img3.png";
import img4 from "../public/images/img4.png";
import img5 from "../public/images/img5.png";
import Image from "next/image";

const Section3 = () => {
  SwiperCore.use([Autoplay]);
  return (
		<section className="container mx-auto md:px-20 py-16">
			<h1 className="font-bold text-4xl py-12 text-center">
				Most Popular Post
			</h1>

			<Swiper
				sliderPerView={2}
				loop={true}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
				}}
			>
				<SwiperSlide>
					<Post img={img2} />
				</SwiperSlide>
				<SwiperSlide><Post img={img3} /></SwiperSlide>
				<SwiperSlide><Post img={img4} /></SwiperSlide>
				<SwiperSlide><Post img={img5} /></SwiperSlide>
				<SwiperSlide><Post img={img2} /></SwiperSlide>
				<SwiperSlide><Post img={img1} /></SwiperSlide>
			</Swiper>
		</section>
	);
}

export default Section3

const Post = ({ img }) => {
	return (
		<div className="grid w-200">
			<div className="images">
				<Link href={"/"}>
					<Image
						className=""
						src={img}
						width={400}
						height={350}
						alt={"Image 1"}
					/>
				</Link>
			</div>
			<div className="info flex justify-center flex-col py-4">
				<div className="cat">
					<Link className="text-orange-600 hover:text-orange-800" href={"/"}>
						Business
					</Link>
					<Link className="text-gray-800 hover:text-gray-600" href={"/"}>
						September 29 2011
					</Link>
				</div>
				<div className="title">
					<Link
						href={"/"}
						className="text-xl   font-bold text-gray-800 hover:text-gray-600 text-center"
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</Link>
				</div>
				<p className="text-gray-500 w-100 py-3 text-center">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry standard dummy text ever
					since the 1500s, when an unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged. It
				</p>
				<Author />
			</div>
		</div>
	);
};

