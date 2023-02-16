import React from 'react';
import '../styles/globals.css'
import {Login} from '../components'
require("dotenv").config();
 
function MyApp({ Component,pageProps }) {
  return (
    // <Component {...pageProps} />
    <Login/>
  );
}


export default MyApp;
