import { Flex, Heading, Avatar } from "@chakra-ui/react";

const Topbar = () => {
	return (
		<Flex bg="gray.100" h="81px" w="100%" align="center" p={5}>
			<Avatar src="" marginEnd={3} />
			<Heading size="lg">Charles Junior</Heading>
		</Flex>
	);
}

export default Topbar