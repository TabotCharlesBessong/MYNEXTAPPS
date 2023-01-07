
// api/posts http://localhost:3000/api/posts

export default async function getPost () {
  const res = await fetch('http://localhost:3000/api/posts')
  const posts = await res.json()
  return posts
}