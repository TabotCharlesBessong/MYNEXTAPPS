
import dynamic from 'next/dynamic'

const Login = () => {
  return(
    <h1>Login</h1>
  )
}

export default dynamic(() => Promise.resolve(Login), { ssr: false });