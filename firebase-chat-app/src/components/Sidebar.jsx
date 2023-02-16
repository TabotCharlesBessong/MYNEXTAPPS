import { Button,Avatar ,IconButton,Flex,Text} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { auth, db } from "../firebase";
import {signOut} from 'firebase/auth'

const Chat = () => {
  return (
		<Flex
			// justifyContent="space-between"
			align="center"
			_hover={{ cursor: "pointer", bg: "gray.100" }}
			p={3}
		>
			<Avatar marginEnd={3} src="" />
			<Text>Hello men how are you doing</Text>
		</Flex>
	);
}

export default function Sidebar() {

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
				<Flex align="center">
					<Avatar src="" marginEnd={3} />
					<Text>Charles</Text>
				</Flex>

				<IconButton
					size="sm"
					isRound
					icon={<ArrowLeftIcon />}
					onClick={() => signOut(auth)}
				/>
			</Flex>

			<Button m={5} p={4} onClick={{}}>
				New Chat
			</Button>
			<Flex
				overflowX="scroll"
				direction="column"
				sx={{ scrollbarWidth: "none" }}
				flex={1}
			>
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
			</Flex>
		</Flex>
	);
}