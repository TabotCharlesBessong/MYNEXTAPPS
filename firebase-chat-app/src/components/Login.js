/* eslint-disable no-unused-vars */

import dynamic from 'next/dynamic'
import Head from 'next/head';
import {ChatIcon} from '@chakra-ui/icons'
import {Box,Button,Center,Stack} from '@chakra-ui/react'
import { useSignInWithGoogle,useSignInWithGithub } from "react-firebase-hooks/auth";
import {auth} from '../firebase'

const Login = () => {
	const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);
	const [signInWithGithub, userGithub, loadingGithub, errorGithub] = useSignInWithGithub(auth);
  return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<Center h="100vh">
				<Stack
					align="center"
					bg="gray.600"
					p={16}
					rounded="3xl"
					spacing={12}
					boxShadow="lg"
				>
					<Box bg="blue.500" w="fit-content" p={5} rounded="3xl" boxShadow="md">
						<ChatIcon w="100px" h="100px" color="white" />
					</Box>
					<Button onClick={() => signInWithGoogle("",{
						prompt:"select an account"
					})} mb={4} boxShadow="md">Sign In with Google</Button>
					<Button onClick={() => signInWithGithub("",{
						prompt:"select an account"
					})} boxShadow="md">Sign In with Github</Button>
				</Stack>
			</Center>
		</>
	);
}

export default dynamic(() => Promise.resolve(Login), { ssr: false });