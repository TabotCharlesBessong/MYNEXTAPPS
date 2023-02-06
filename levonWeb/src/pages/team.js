import { useContext } from "react";
import Image from "next/image";
import {
	Heading,
	Avatar,
	Box,
	Center,
	// Image,
	Flex,
	Text,
	Stack,
	Button,
	useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import data from '../constants/data'

const LeftArrow = () => {
	const { scrollPrev } = useContext(VisibilityContext);

	return (
		<Flex justifyContent="center" alignItems="center" marginRight="1">
			<Icon
				as={FaArrowAltCircleLeft}
				onClick={() => scrollPrev()}
				fontSize="2xl"
				cursor="pointer"
				d={["none", "none", "none", "block"]}
			/>
		</Flex>
	);
};

const RightArrow = () => {
	const { scrollNext } = useContext(VisibilityContext);

	return (
		<Flex justifyContent="center" alignItems="center" marginLeft="1">
			<Icon
				as={FaArrowAltCircleRight}
				onClick={() => scrollNext()}
				fontSize="2xl"
				cursor="pointer"
				d={["none", "none", "none", "block"]}
			/>
		</Flex>
	);
};
const Team = () => {
  const team = data.team
  console.log(data)
  console.log(team)
	return (
		<ScrollMenu
			LeftArrow={LeftArrow}
			RightArrow={RightArrow}
			style={{ overflow: "hidden" }}
		>
			{data.team.map((item) => (
				<Flex
					key={item.id}
					width="1000px"
					itemId={item.id}
					overflow="hidden"
					p="1"
					align="center"
					justify="center"
				>
					<Flex>
						<Image
							placeholder="blur"
							blurDataURL={item.url}
							src={item.image}
							width={"100%"}
							height={550}
							sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
							alt=""
						/>
					</Flex>
					<Flex>
						<Box p={6}>
							<Stack spacing={0} align={"center"} mb={5}>
								<Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
									{item.firstName}
								</Heading>
								<Text color={"gray.500"}>{item.lastName}</Text>
							</Stack>

							<Stack direction={"row"} justify={"center"} spacing={6}>
								<Stack spacing={0} align={"center"}>
									{/* <Text fontWeight={600}>23k</Text> */}
									<Text fontSize={"md"} color={"gray.500"}>
										{item.role}
									</Text>
								</Stack>
								<Stack spacing={0} align={"center"}>
									{/* <Text fontWeight={600}>23k</Text> */}
									<Text fontSize={"sm"} color={"gray.500"}>
										{item.responsibility}
									</Text>
								</Stack>
							</Stack>

							{/* <Button
								w={"full"}
								mt={8}
								bg={useColorModeValue("#151f21", "gray.900")}
								color={"white"}
								rounded={"md"}
								_hover={{
									transform: "translateY(-2px)",
									boxShadow: "lg",
								}}
							>
								Follow
							</Button> */}
						</Box>
					</Flex>
				</Flex>
			))}
		</ScrollMenu>
	);
}

export default Team
