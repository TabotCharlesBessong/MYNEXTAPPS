import Head from "next/head";
import { PostCard, PostWidget, Category } from "../components";
import { getPosts } from "../services";

export default function Home({posts}) {
	console.log(posts)

// const posts = [
// 	{
// 		title: "React Testing",
// 		excerpt: "learn testing",
// 	},
// 	{
// 		title: "React With Tailwind",
// 		excerpt: "learn react js with tailwind css",
// 	},
// ];

	return (
		<div className="container mx-auto px-10 mb-8">
			<Head>
				<title>CMS Blog</title>
			</Head>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className='lg:col-span-8 col-span-1' >
					{posts.map((post, index) => (
						<div key={index + post.title}>
							<PostCard post={post.node} />
						</div>
					))}
				</div>
				<div className="lg:col-span-4 col-span-1">
          <div className='lg:sticky relative top-8' >
            <PostWidget/>
						<Category/>
					</div>
				</div>
			</div>
		</div>
	);
}


export async function getStaticProps(){
	const posts = (await getPosts()) || []

	return {
		props:{posts}
	}
}