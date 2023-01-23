import Head from "next/head";


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

			
		</div>
	);
}

