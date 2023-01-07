
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Autoplay } from "swiper";
import Link from "next/Link";
import { Author, Spinner } from "../components";
import Image from "next/image";
import fetcher from "../utility/fetcher";

const Section3 = () => {
	const { data, isLoading, isError } = fetcher("api/popular");

	// if(data) console.log(data);
	if (isLoading) return <Spinner />;
	if (isError) return <div>error</div>;
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
				{data.map((value, index) => (
					<SwiperSlide key={index}>
						<Post data={value} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}

export default Section3

const Post = ({ data }) => {
	const { id, category, img, published, author, description, title, subtitle } =
		data;
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
						{category || "Unknown"}
					</Link>
					<Link className="text-gray-800 hover:text-gray-600" href={"/"}>
						{published || "Unknown"}
					</Link>
				</div>
				<div className="title">
					<Link
						href={"/"}
						className="text-xl   font-bold text-gray-800 hover:text-gray-600 text-center"
					>
						{title || "Unknown"}
					</Link>
				</div>
				<p className="text-gray-500 text-sm w-100 py-3 text-center">
					{subtitle || "unKnown"}
				</p>
				{author ? <Author /> : ""}
			</div>
		</div>
	);
};

