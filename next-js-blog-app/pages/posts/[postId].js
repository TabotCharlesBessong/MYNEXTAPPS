
import Format from '../../layout/format'
import {Author,Related} from '../../components'
import Image from 'next/image'
import getPost from '../../utility/helper'

const Page = ({
	id,
	category,
	img,
	published,
	author,
	description,
	title,
	subtitle,
}) => {
	return (
		<Format>
			<section className="container mx-auto px-2 py-16 w-1/2">
				<div className="flex justify-center">{author ? <Author /> : ""}</div>
				<div className="post py-10">
					<h1 className="font-bold text-4xl text-center pb-5">
						{title || "Unknown"}
					</h1>
					<p className="text-gray-500 text-xl text-center">
						{subtitle || "Unknown"}
					</p>
					<div className="py-10">
						<Image src={img} width={900} height={600} />
					</div>

					<div className="content text-gray-600 text-lg flex flex-col gap-4">
						{description || "Unknown"}
					</div>
				</div>
				<Related />
			</section>
		</Format>
	);
};

export default Page

export async function getStaticProps({params}){
  const posts = await getPost(params.postId)

  return {
    props:posts
  }
}

export async function getStaticPaths(){
  const posts = await getPost()

  const paths = posts.map(value => {
    return {
      params:{
        postId:value.id.toString()
      }
    }
  })

  return {
    paths,
    fallback:false
  }
}