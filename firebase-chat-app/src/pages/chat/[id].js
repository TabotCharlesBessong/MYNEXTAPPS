import { Flex ,Text} from '@chakra-ui/react'
import React from 'react'
import { Bottombar, Sidebar,Topbar } from '../../components'
import Head from 'next/head'
import { useRouter } from "next/router";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import getOtherEmail from "../../../utils/getOtherEmail";
import { useRef, useEffect } from "react";
import {auth,db} from '../../firebase'

const ChatPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [user] = useAuthState(auth);
	const [chat] = useDocumentData(doc(db, "chats", id));
	const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
	const [messages] = useCollectionData(q);
	const bottomOfChat = useRef();

	const getMessages = () =>
		messages?.map((msg) => {
			const sender = msg.sender === user.email;
			return (
				<Flex
					key={Math.random()}
					alignSelf={sender ? "flex-start" : "flex-end"}
					bg={sender ? "blue.100" : "green.100"}
					w="fit-content"
					minWidth="100px"
					borderRadius="lg"
					p={3}
					m={1}
				>
					<Text>{msg.text}</Text>
				</Flex>
			);
		});

		const timeout = () =>{
setTimeout(
				bottomOfChat.current.scrollIntoView({
					behavior: "smooth",
					block: "start",
				}),
				100
			)
		}

	// useEffect(
	// 	() =>
			
	// 	[messages]
	// );

	useEffect(()=>{
    timeout
	},[messages])

  return (
		<>
			<Head>
				<title>FIREBASE CHAT APP</title>
			</Head>
			<Flex flex={1} h="100vh">
				<Sidebar />
				<Flex flex={1}>
					<Flex direction="column">
						<Topbar email={getOtherEmail(chat?.users, user)} />
						<Flex
							sx={{ scrollbarWidth: "none" }}
							overflowX="scroll"
							pt={4}
							mx={5}
							p={3}
							direction="column"
							flex={1}
						>
							{getMessages()}
							<div ref={bottomOfChat}></div>
						</Flex>
						<Bottombar id={id} user={user} />
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}

export default ChatPage