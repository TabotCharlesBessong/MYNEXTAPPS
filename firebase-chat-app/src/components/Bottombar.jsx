import React,{useState} from 'react'
import { FormControl,Input,Button,Flex } from '@chakra-ui/react'
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase"

const Bottombar = ({id,user}) => {
  const [input, setInput] = useState("");

	const sendMessage = async (e) => {
		e.preventDefault();
		await addDoc(collection(db, `chats/${id}/messages`), {
			text: input,
			sender: user.email,
			timestamp: serverTimestamp(),
		});
		setInput("");
	};
  return (
		<Flex justify="center" align="center" maxWidth="500px" mb={4} p={3}>
			<FormControl
				onSubmit={sendMessage}
				as="form"
				p={3}
				bg="blue.300"
				h="61px"
			>
				<Input
					placeholder="Type a message..."
					autoComplete="off"
					onChange={(e) => setInput(e.target.value)}
					value={input}
				/>
				<Button type="submit" hidden>
					Submit
				</Button>
			</FormControl>
		</Flex>
	);
}

export default Bottombar