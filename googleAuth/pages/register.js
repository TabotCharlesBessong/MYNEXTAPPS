import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
// import Image from "next/image";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useFormik } from "formik";
import { validateRegister } from "../utilities/validate";

const Register = () => {
	const [show, setShow] = useState({ password: false, cpassword: false });
	const formik = useFormik({
		initialValues:{
			username:'',
			email:'',
			password:'',
			cpassword:''
		},
		validate:validateRegister,
		onSubmit
	})

	async function onSubmit(values){
		console.log(values)
	}

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
				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
					<div
						className={`${styles.input_group} ${
							formik.errors.username && formik.touched.username
								? "border-rose-600"
								: ""
						}`}
					>
						<input
							type="text"
							name="username"
							placeholder="username"
							className={styles.input_text}
							{...formik.getFieldProps("username")}
						/>
						<span className="icon flex items-center px-4">
							<HiOutlineUser size={25} />
						</span>
					</div>
					{formik.errors.username && formik.touched.username ? (
						<span className="text-rose-500">{formik.errors.username}</span>
					) : (
						""
					)}
					<div
						className={`${styles.input_group} ${
							formik.errors.email && formik.touched.email
								? "border-rose-600"
								: ""
						}`}
					>
						<input
							type="email"
							name="email"
							placeholder="Email"
							className={styles.input_text}
							{...formik.getFieldProps("email")}
						/>
						<span className="icon flex items-center px-4">
							<HiAtSymbol size={25} />
						</span>
					</div>
					{formik.errors.email && formik.touched.email ? (
						<span className="text-rose-500">{formik.errors.email}</span>
					) : (
						""
					)}
					<div
						className={`${styles.input_group} ${
							formik.errors.password && formik.touched.password
								? "border-rose-600"
								: ""
						}`}
					>
						<input
							type={`${show.password ? "text" : "password"}`}
							name="password"
							placeholder="password"
							className={styles.input_text}
							{...formik.getFieldProps("password")}
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
					{formik.errors.password && formik.touched.password ? (
						<span className="text-rose-500">{formik.errors.password}</span>
					) : (
						""
					)}

					<div
						className={`${styles.input_group} ${
							formik.errors.cpassword && formik.touched.cpassword
								? "border-rose-600"
								: ""
						}`}
					>
						<input
							type={`${show.cpassword ? "text" : "password"}`}
							name="cpassword"
							placeholder="Confirm Password"
							className={styles.input_text}
							{...formik.getFieldProps("cpassword")}
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
					{formik.errors.cpassword && formik.touched.cpassword ? (
						<span className="text-rose-500">{formik.errors.cpassword}</span>
					) : (
						""
					)}

					{/* login buttons */}
					<div className="input-button">
						<button type="submit" className={styles.button}>
							Register
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