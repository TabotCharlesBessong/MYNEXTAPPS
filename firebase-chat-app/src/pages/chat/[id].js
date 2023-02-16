import { Flex ,Text} from '@chakra-ui/react'
import React from 'react'
import { Bottombar, Sidebar,Topbar } from '../../components'

const ChatPage = () => {
  return (
		<Flex flex={1} h="100vh">
			<Sidebar />
			<Flex flex={1}>
				<Flex direction="column">
					<Topbar />
					<Flex
						sx={{ scrollbarWidth: "none" }}
						overflowX="scroll"
						pt={4}
						mx="auto"
						p={3}
						direction="column"
						flex={1}
					>
						<Flex
							bg="blue.100"
							m={2}
							w="fit-content"
							minW="100px"
							maxW="600px"
							borderRadius="lg"
							p={3}
						>
							<Text>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Incidunt perspiciatis nostrum itaque asperiores. Inventore cum
								numquam mollitia ab! Nulla quam deserunt officiis aliquid iure
								ad praesentium. Asperiores ex quibusdam facere. Fuga, fugit
								facere odio commodi eum quod perspiciatis autem aperiam?{" "}
							</Text>
						</Flex>
						<Flex
							bg="green.100"
							m={2}
							alignSelf="flex-end"
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							maxW="600px"
							p={3}
						>
							<Text>This </Text>
						</Flex>
						<Flex
							bg="blue.100"
							m={2}
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>This is a dummy </Text>
						</Flex>
						<Flex
							bg="green.100"
							m={2}
							alignSelf="flex-end"
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>This is a dummy </Text>
						</Flex>
						<Flex
							bg="green.100"
							alignSelf="flex-end"
							w="fit-content"
							minW="100px"
							m={2}
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>This is a dummy </Text>
						</Flex>
						<Flex
							m={2}
							w="fit-content"
							bg="green.100"
							alignSelf="flex-end"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Incidunt perspiciatis nostrum itaque asperiores. Inventore cum
								numquam mollitia ab! Nulla quam deserunt officiis aliquid iure
								ad praesentium. Asperiores ex quibusdam facere. Fuga, fugit
								facere odio commodi eum quod perspiciatis autem aperiam?{" "}
							</Text>
						</Flex>
						<Flex
							bg="blue.100"
							m={2}
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Incidunt perspiciatis nostrum itaque asperiores. Inventore cum
								numquam mollitia ab! Nulla quam deserunt officiis aliquid iure
								ad praesentium. Asperiores ex quibusdam facere. Fuga, fugit
								facere odio commodi eum quod perspiciatis autem aperiam?{" "}
							</Text>
						</Flex>
						<Flex
							bg="green.100"
							m={2}
							alignSelf="flex-end"
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>This </Text>
						</Flex>
						<Flex
							bg="blue.100"
							m={2}
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>This is a dummy </Text>
						</Flex>
						<Flex
							bg="green.100"
							m={2}
							alignSelf="flex-end"
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>This is a dummy </Text>
						</Flex>
						<Flex
							bg="green.100"
							m={2}
							alignSelf="flex-end"
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>This is a dummy </Text>
						</Flex>
						<Flex
							bg="blue.100"
							m={2}
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Incidunt perspiciatis nostrum itaque asperiores. Inventore cum
								numquam mollitia ab! Nulla quam deserunt officiis aliquid iure
								ad praesentium. Asperiores ex quibusdam facere. Fuga, fugit
								facere odio commodi eum quod perspiciatis autem aperiam?{" "}
							</Text>
						</Flex>
						<Flex
							bg="green.100"
							m={2}
							alignSelf="flex-end"
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>This </Text>
						</Flex>
						<Flex
							bg="blue.100"
							m={2}
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>This is a dummy </Text>
						</Flex>
						<Flex
							bg="green.100"
							m={2}
							alignSelf="flex-end"
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>This is a dummy </Text>
						</Flex>
						<Flex
							bg="green.100"
							m={2}
							alignSelf="flex-end"
							w="fit-content"
							minW="100px"
							borderRadius="lg"
							p={3}
							maxW="600px"
						>
							<Text>This is a dummy </Text>
						</Flex>
					</Flex>
					<Bottombar />
				</Flex>
			</Flex>
		</Flex>
	);
}

export default ChatPage