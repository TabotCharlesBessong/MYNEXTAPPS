import '../styles/globals.css'
import { QueryClientProvider,QueryClient } from 'react-query'
import {store} from '../redux/store'
import {Provider} from 'react-redux'

//create client 
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</QueryClientProvider>
	);
}
