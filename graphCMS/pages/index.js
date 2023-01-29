import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { useSession,getSession,signOut } from "next-auth/react";

export default function Home() {
	const {data:session} = useSession()

	function handleSignOut(){
    signOut()
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Home Page</title>
			</Head>

			{session ? User({session,handleSignOut}) : Guest()}
		</div>
	);
}

// Guest
function Guest() {
	return (
		<main className="container mx-auto text-center py-20">
			<h3 className="text-7xl font-bold text-orange-500">Guest Homepage</h3>

			
		</main>
	);
}
