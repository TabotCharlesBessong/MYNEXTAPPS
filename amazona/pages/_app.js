import React from 'react';
import {StoreProvider} from '../utils/Store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
