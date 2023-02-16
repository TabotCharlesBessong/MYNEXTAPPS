
import dynamic from 'next/dynamic'

const Login = () => {
  console.log(process.env.NEXT_API_KEY,);
  console.log(process.env.NEXT_AUTH_DOMAIN);
  console.log(process.env.NEXT_DATABASE_URL);
  console.log(process.env.NEXT_PROJECT_ID);
  console.log()
  console.log()
  console.log()
  console.log();
  return(
    <h1>Login</h1>
  )
}

export default dynamic(() => Promise.resolve(Login), { ssr: false });