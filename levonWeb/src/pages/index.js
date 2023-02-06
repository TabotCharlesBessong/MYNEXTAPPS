
import {
	Flex,
	Container,
	Heading,
	Stack,
	Text,
	Button,
	Image,
	useBreakpointValue,
} from "@chakra-ui/react";
// import { Navbar } from "../components";
import Link from 'next/link'


export default function Home({propertiesForSale,propertiesForRent}) {

	return (
		<Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
			<Flex p={8} flex={1} align={"center"} justify={"center"}>
				<Stack spacing={6} w={"full"} maxW={"lg"}>
					<Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
						<Text
							as={"span"}
							position={"relative"}
							_after={{
								content: "''",
								width: "full",
								height: useBreakpointValue({ base: "20%", md: "30%" }),
								position: "absolute",
								bottom: 1,
								left: 0,
								bg: "blue.400",
								zIndex: -1,
							}}
						>
							Building Technology
						</Text>
						<br />{" "}
						<Text color={"blue.400"} as={"span"}>
							For Africans
						</Text>{" "}
						<br />
						<Text color={"orange.600"} as={"span"}>
							By Africans
						</Text>{" "}
					</Heading>
					<Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
						We are a group of young African who are working to solve Africans
						problems with the aid of technology. <br /> We are to tackle
						problems concerning global warming, hunger and transportation
					</Text>
					<Stack direction={{ base: "column", md: "row" }} spacing={4}>
						<Button
							as={Link}
							href="/message"
							rounded={"full"}
							bg={"blue.400"}
							color={"white"}
							_hover={{
								bg: "blue.600",
							}}
						>
							Get In Touch
						</Button>
						<Button bg={"green.300"} as={Link} href="/about" rounded={"full"}>
							About Us
						</Button>
					</Stack>
				</Stack>
			</Flex>
			<Flex flex={1}>
				<Image
					alt={"Login Image"}
					objectFit={"cover"}
					src={
						"https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
					}
				/>
			</Flex>
		</Stack>
	);
}
