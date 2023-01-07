
import Link from 'next/link'
import Image from 'next/image'
import img2 from "../public/images/img2.jpg";
import img1 from "../public/images/img1.jpg";
import img3 from "../public/images/img3.png";
import img4 from "../public/images/img4.png";
import img5 from "../public/images/img5.png";
import { Author } from "../components";
// import getPost from '../utility/helper'
import fetcher from "../utility/fetcher";

const Section2 = () => {
	// getPost().then()
	const {data,isLoading,isError} = fetcher('api/posts')
	
	// if(data) console.log(data);
	if(isLoading) return <div>loading</div>
	if(isError) return <div>error</div>
  return (
		<section className="container mx-auto md:px-20 py-10">
			<h1 className="font-bold text-4xl py-12 text-center">
				Latest Post Title
			</h1>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
				{
					data.map((value,index) => (
           <Post data={value} key={index} />
					))
				}
			</div>
		</section>
	);
}

export default Section2

const Post = ({data}) => {
	const {id,category,img,published,author,description,title,subtitle} = data
  return (
		<div className="item">
			<div className="images">
				<Link href={"/"}>
					<Image
						className="rounded"
						src={img || '/'}
						width={500}
						height={350}
						alt={"Image 1"}
					/>
				</Link>
			</div>
			<div className="info flex justify-center flex-col py-4">
				<div className="cat">
					<Link className="text-orange-600 hover:text-orange-800" href={"/"}>
						{category || 'Unknown'}
					</Link>
					<Link className="text-gray-800 hover:text-gray-600" href={"/"}>
						{published || "Not in the calendar range"}
					</Link>
				</div>
				<div className="title">
					<Link
						href={"/"}
						className="text-xl font-bold text-gray-800 hover:text-gray-600 "
					>
						{title}
					</Link>
				</div>
				<p className="text-gray-500 py-3">
					{subtitle}
				</p>
				{author ? <Author/> : '' }
			</div>
		</div>
	);
}