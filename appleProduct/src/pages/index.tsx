import Head from 'next/head';
import React from 'react'
import { Header } from '../components';

const Home:React.FC  = () => {
  

  return (
		<div>
			<Head>
				<title>Apple Product</title>
			</Head>
			<Header/>
			<h1 className="text-5xl text-orange-700 font-bold underline">Hello world!</h1>
		</div>
	);
};

export default Home;
