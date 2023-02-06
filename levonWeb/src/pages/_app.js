
import {SessionProvider} from 'next-auth/react'
import {ChakraProvider} from '@chakra-ui/react'
import Router from 'next/router'


export default function App({ Component, pageProps }) {
  return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
