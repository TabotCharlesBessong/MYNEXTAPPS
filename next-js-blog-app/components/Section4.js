import {Author} from '../components'
import Link from "next/link";
import Image from "next/image";
import img2 from "../public/images/img2.jpg";
import img1 from "../public/images/img1.jpg";
import img3 from "../public/images/img3.png";
import img4 from "../public/images/img4.png";
import img5 from "../public/images/img5.png";

const Section4 = () => {
	return (
		<section className="container mx-auto md:px-20 py-16">
			<div className="grid lg:grid-cols-2">
				<div className="item">
					<h1 className="font-bold text-4xl py-12">Business</h1>
					<div className="flex flex-col gap-6">
						{/* posts */}
						<Post img={img3} />
						<Post img={img5} />
						<Post img={img2} />
						<Post img={img1} />
						<Post img={img4} />
					</div>
				</div>
				<div className="item">
					<h1 className="font-bold text-4xl py-12">Travel</h1>
					<div className="flex flex-col gap-6">
						<Post img={img1} />
						<Post img={img2} />
						<Post img={img4} />
						<Post img={img5} />
					</div>
				</div>
			</div>
		</section>
	);
}

const  Post = ({img})=> {
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
						Business, Travel
					</Link>
					<Link className="text-gray-800 hover:text-gray-600" href={"/"}>
						- July 3, 2022
					</Link>
				</div>
				<div className="title">
					<Link
						className="text-xl font-bold text-gray-800 hover:text-gray-600"
						href={"/"}
					>
							Your most unhappy customers are your greatest source of learning
					</Link>
				</div>
				<Author/>
			</div>
		</div>
	);
}

export default Section4