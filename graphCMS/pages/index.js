import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {

	

	return (
		<div className={styles.container}>
			<Head>
				<title>Home Page</title>
			</Head>

			<main className="container mx-auto text-center py-20">
				<h3 className="text-7xl font-bold text-orange-500">Guest Homepage</h3>
			</main>
		</div>
	);
}


