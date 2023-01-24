import { QueryClientProvider,QueryClient } from 'react-query'
import {store} from '../redux/store'
import {Provider} from 'react-redux'
import {SessionProvider} from 'next-auth/react'
import {ChakraProvider} from '@chakra-ui/react'
import Router from 'next/router'
import Head from 'next/head'
import nProgress from 'nprogress'
import {Layout} from '../components'

//create client 
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<SessionProvider session={pageProps.sessions}>
					<Head></Head>
					<ChakraProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</ChakraProvider>
				</SessionProvider>
			</Provider>
		</QueryClientProvider>
	);
}
