import React from 'react';
import {StoreProvider} from '../utils/Store'
import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'

function MyApp({ Component, pageProps:{session,...pageProps} }) {
  return (
    <StoreProvider>
      <SessionProvider session={session} >
        <Component {...pageProps} />
      </SessionProvider>
    </StoreProvider>
  );
}

export default MyApp;
