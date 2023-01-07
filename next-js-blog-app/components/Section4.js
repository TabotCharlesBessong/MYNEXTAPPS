import {Author , Spinner} from '../components'
import Link from "next/link";
import Image from "next/image";
import img2 from "../public/images/img2.jpg";
import img1 from "../public/images/img1.jpg";
import img3 from "../public/images/img3.png";
import img4 from "../public/images/img4.png";
import img5 from "../public/images/img5.png";
import fetcher from '../utility/fetcher';

const Section4 = () => {
	const { data, isLoading, isError } = fetcher("api/popular");

	if (data) console.log(data,'trending data');
	if (isLoading) return <Spinner />;
	if (isError) return <div>error</div>;
	return (
		<section className="container mx-auto md:px-20 py-16">
			<div className="grid lg:grid-cols-2">
				<div className="item">
					<h1 className="font-bold text-4xl py-12">Business</h1>
					<div className="flex flex-col gap-6">
						{/* posts */}
						{data[1] ? <Post data={data[1]} /> : ""}
						{data[2] ? <Post data={data[2]} /> : ""}
						{data[3] ? <Post data={data[3]} /> : ""}
					</div>
				</div>
				<div className="item">
					<h1 className="font-bold text-4xl py-12">Travel</h1>
					<div className="flex flex-col gap-6">
						{data[4] ? <Post data={data[4]} /> : ""}
						{data[5] ? <Post data={data[5]} /> : ""}
						{data[3] ? <Post data={data[3]} /> : ""}
					</div>
				</div>
			</div>
		</section>
	);
}

const  Post = ({data})=> {
	const { id, category, img, published, author, description, title, subtitle } =
		data;
	return (
		<div className="flex gap-5">
			<div className="image flex flex-col justify-start">
				<Link href={"/"}>
					<Image
						src={img}
						className="rounded"
						width={300}
						height={250}
					/>
				</Link>
			</div>
			<div className="info flex justify-center flex-col">
				<div className="cat">
					<Link className="text-orange-600 hover:text-orange-800" href={"/"}>
						{category || 'Unknown category'}
					</Link>
					<Link className="text-gray-800 hover:text-gray-600" href={"/"}>
						{published || "Unknown"}
					</Link>
				</div>
				<div className="title">
					<Link
						className="text-xl font-bold text-gray-800 hover:text-gray-600"
						href={"/"}
					>
						{title || "Unknown"}
					</Link>
				</div>
				{author ? <Author/> :'' }
			</div>
		</div>
	);
}

export default Section4