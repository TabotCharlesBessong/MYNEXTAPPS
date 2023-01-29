
import React from 'react'

const PostCard = ({post}) => {
  return (
		<div>
			<h2 className="text-4xl text-bold text-orange-600">{post.title}</h2>
			<h4 className="text2xl text-green-300">{post.excerpt}</h4>
		</div>
	);
}

export default PostCard