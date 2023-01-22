import Head from "next/head";
import Link from "next/link";
import Layout from '../layout/Layout'
import styles from '../styles/Form.module.css'
import Image from "next/image";
import github from '../public/assets/github.svg'
import google from '../public/assets/google.svg'
import {HiAtSymbol,HiFingerPrint} from 'react-icons/hi'
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import {signIn,signOut} from 'next-auth/react'

const Login = () => {
	const [show,setShow] = useState(false)

	async function handleGoogleSignIn(){
		signIn('google',{callbackUrl:"http://localhost:3000"})
	}
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
						<span className="icon flex items-center px-4" >
							<HiAtSymbol size={25} />
						</span>
					</div>
					<div className={styles.input_group}>
						<input
							type={`${show ? 'text' :'password'}`}
							name="password"
							placeholder="password"
							className={styles.input_text}
						/>
						<span onClick={() => setShow(!show)} className="icon flex items-center px-4" >
						{
							show ? <AiFillEye size={25} /> : <AiOutlineEyeInvisible size={25}/>
						}
						</span>
					</div>

					{/* login buttons */}
					<div className="input-button">
						<button type="submit" className={styles.button}>
							Login
						</button>
					</div>
					<div className="input-button">
						<button onClick={handleGoogleSignIn} type="button" className={styles.button_custom}>
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