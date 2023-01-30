import '../styles/global.scss'
import {Layout} from '../components'

//create client 

export default function App({ Component, pageProps }) {
  return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
