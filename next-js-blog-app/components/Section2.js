
import Link from 'next/link'
import Image from 'next/image'
import img2 from "../public/images/img2.jpg";
import img1 from "../public/images/img1.jpg";
import img3 from "../public/images/img3.png";
import img4 from "../public/images/img4.png";
import img5 from "../public/images/img5.png";
import { Author } from "../components";

const Section2 = () => {
  return (
		<section className="container mx-auto md:px-20 py-10">
			<h1 className="font-bold text-4xl py-12 text-center">
				Latest Post Title
			</h1>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
				<Post img={img2} />
				<Post img={img1} />
				<Post img={img3} />
				<Post img={img2} />
				<Post img={img4} />
				<Post img={img1} />
				<Post img={img5} />
				<Post img={img3} />
				<Post img={img5} />
				<Post img={img4} />
			</div>
		</section>
	);
}

export default Section2

const Post = ({img}) => {
  return (
		<div className="items">
			<div className="images">
				<Link href={"/"}>
					<Image
						className="rounded"
						src={img}
						width={500}
						height={500}
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
						className="text-xl font-bold text-gray-800 hover:text-gray-600 "
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</Link>
				</div>
				<p className="text-gray-500 py-3">
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
}