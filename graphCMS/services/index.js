import {request,gql} from 'graphql-request'
import { Query } from 'mongoose';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
  const query = gql`
		query Assets {
			postsConnection {
				edges {
					node {
						author {
							bio
							id
							name
							photo {
								url
							}
						}
						createdAt
						title
						slug
						excerpt
						featuredImage {
							url(transformation: {})
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;

  const result = await request(graphqlAPI,query)

  return result.postsConnection.edges
}

export const getCategories = async () => {
	const query = gql`
		query GetCategories {
			categories {
				name
				slug
			}
		}
	`;

	const result = await request(graphqlAPI, query);

	return result.categories;
};

export const getRecentPosts = async () => {
	const query = gql`
		query Assets {
			posts(orderBy: publishedAt_ASC, last: 3) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;
	const result = await request(graphqlAPI, query);

	return result.posts;
}

export const getSimilarPost = async () => {
	const query = gql`
		query GetPostDetails($slug: String, $category: [String!]) {
			posts(
				where: {
					slug_not: $slug
					AND: { categories_some: { slug_in: $categories } }
				}
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;
	const result = await request(graphqlAPI, query);

	return result.posts;
}