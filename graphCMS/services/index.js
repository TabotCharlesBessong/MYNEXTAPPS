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