import { Button, Avatar, IconButton, Flex, Text } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "@firebase/firestore";
import getOtherEmail from "../../utils/getOtherEmail";
import {useRouter} from 'next/router'

export default function Sidebar() {
	const [user] = useAuthState(auth);
	const [snapshot, loading, error] = useCollection(collection(db, "chats"));
	const chats = snapshot?.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	console.log(chats);
	const router = useRouter()

	const redirect = (id) => {
		router.push(`/chat/${id}`);
	};

	const chatExists = (email) =>
		chats?.find(
			(chat) => chat.users.includes(user.email) && chat.users.includes(email)
		);

	const newChat = async () => {
		const input = prompt("Enter email of chat recipient");
		if (!chatExists(input) && input != user.email) {
			await addDoc(collection(db, "chats"), { users: [user.email, input] });
		}
	};

	const chatList = () => {
		return chats
			?.filter((chat) => chat.users.includes(user.email))
			.map((chat, index) => (
				<Flex
					key={index}
					// justifyContent="space-between"
					align="center"
					_hover={{ cursor: "pointer", bg: "gray.100" }}
					p={3}
					onClick={() => redirect(chat.id)}
				>
					<Avatar marginEnd={3} src="" />
					<Text>{getOtherEmail(chat.users, user)}</Text>
				</Flex>
			));
	};

	return (
		<Flex
			// bg="blue.100"
			h="100%"
			w="300px"
			borderEnd="1px solid"
			borderColor="gray.200"
			direction="column"
		>
			<Flex
				// bg="red.100"
				h="81px"
				w="100%"
				align="center"
				justifyContent="space-between"
				borderBottom="1px solid"
				borderColor="gray.200"
				p={3}
				position="sticky"
			>
				<Flex cursor="pointer" align="center">
					<Avatar src={user.photoURL} marginEnd={3} />
					<Text>{user.displayName}</Text>
				</Flex>

				<IconButton
					size="sm"
					isRound
					icon={<ArrowLeftIcon />}
					onClick={() => signOut(auth)}
				/>
			</Flex>

			<Button m={5} p={4} onClick={() => newChat()}>
				New Chat
			</Button>
			<Flex
				overflowX="scroll"
				direction="column"
				sx={{ scrollbarWidth: "none" }}
				flex={1}
			>
				{chatList()}
			</Flex>
		</Flex>
	);
}
