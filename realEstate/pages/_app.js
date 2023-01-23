import '../styles/globals.css'
import { QueryClientProvider,QueryClient } from 'react-query'
import {store} from '../redux/store'
import {Provider} from 'react-redux'
import {SessionProvider} from 'next-auth/react'

//create client 
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
			  <SessionProvider session={pageProps.sessions} >
				  <Component {...pageProps} />
				</SessionProvider>
			</Provider>
		</QueryClientProvider>
	);
}
