import Head from "next/head";
import Link from "next/link";
import Layout from '../layout/Layout'
import styles from '../styles/Form.module.css'
import Image from "next/image";
import github from '../public/assets/github.svg'
import google from '../public/assets/google.svg'

const Login = () => {
  return (
		<Layout>
			<Head>
				<title>Login</title>
			</Head>
			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
					<p className="w-3/4 mx-auto text-gray-400">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
						officia?
					</p>
				</div>

				{/* form */}
				<form className="flex flex-col gap-5">
					<div className={styles.input_group}>
						<input
							type="email"
							name="email"
							placeholder="Email"
							className={styles.input_text}
						/>
					</div>
					<div className={styles.input_group}>
						<input
							type="password"
							name="password"
							placeholder="password"
							className={styles.input_text}
						/>
					</div>

					{/* login buttons */}
					<div className="input-button">
						<button type="submit" className={styles.button}>
							Login
						</button>
					</div>
					<div className="input-button">
						<button type="button" className={styles.button_custom}>
							Sign In with Google{" "}
							<Image
								src={google}
								width="20"
								height={20}
							></Image>
						</button>
					</div>
					<div className="input-button">
						<button type="button" className={styles.button_custom}>
							Sign In with Github{" "}
							<Image
								src={github}
								width={25}
								height={25}
							></Image>
						</button>
					</div>
				</form>

				{/* bottom */}
				<p className="text-center text-gray-400 ">
					dont have an account yet?{" "}
					<Link className="text-blue-700" href={"/register"}>
					Sign Up
					</Link>
				</p>
			</section>
		</Layout>
	);
}

export default Login