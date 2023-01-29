import '../styles/globals.css'

//create client 
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
		
		<Component {...pageProps} />
	);
}
