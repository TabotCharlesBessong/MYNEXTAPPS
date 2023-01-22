import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
// import Image from "next/image";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const Register = () => {
	const [show, setShow] = useState({ password: false, cpassword: false });

	return (
		<Layout>
			<Head>
				<title>Register</title>
			</Head>

			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
					<p className="w-3/4 mx-auto text-gray-400">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
						officia?
					</p>
				</div>

				{/* form */}
				<form className="flex flex-col gap-5">
					<div className={styles.input_group}>
						<input
							type="text"
							name="Username"
							placeholder="Username"
							className={styles.input_text}
						/>
						<span className="icon flex items-center px-4">
							<HiOutlineUser size={25} />
						</span>
					</div>
					<div className={styles.input_group}>
						<input
							type="email"
							name="email"
							placeholder="Email"
							className={styles.input_text}
						/>
						<span className="icon flex items-center px-4">
							<HiAtSymbol size={25} />
						</span>
					</div>
					<div className={styles.input_group}>
						<input
							type={`${show.password ? "text" : "password"}`}
							name="password"
							placeholder="password"
							className={styles.input_text}
						/>
						<span
							className="icon flex items-center px-4"
							onClick={() => setShow({ ...show, password: !show.password })}
						>
							{show.password ? (
								<AiFillEye size={25} />
							) : (
								<AiOutlineEyeInvisible size={25} />
							)}
						</span>
					</div>

					<div className={styles.input_group}>
						<input
							type={`${show.cpassword ? "text" : "password"}`}
							name="cpassword"
							placeholder="Confirm Password"
							className={styles.input_text}
						/>
						<span
							className="icon flex items-center px-4"
							onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
						>
							{show.password ? (
								<AiFillEye size={25} />
							) : (
								<AiOutlineEyeInvisible size={25} />
							)}
						</span>
					</div>

					{/* login buttons */}
					<div className="input-button">
						<button type="submit" className={styles.button}>
							Login
						</button>
					</div>
				</form>

				{/* bottom */}
				<p className="text-center text-gray-400 ">
					Have an account?{" "}
					<Link className="text-blue-700" href={"/login"}>
          Sign In
					</Link>
				</p>
			</section>
		</Layout>
	);
}

export default Register