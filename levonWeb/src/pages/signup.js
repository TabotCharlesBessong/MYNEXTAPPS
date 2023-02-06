

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { AuthLayout } from "../components";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    fName:'',
    lName:'',
    email:'',
    password:'',
    cpassword:''
  })
	return (
		<AuthLayout>
			<Flex
				minH={"100vh"}
				align={"center"}
				justify={"center"}
				bg={useColorModeValue("gray.50", "gray.800")}
				flex={1}
			>
				<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
					<Stack align={"center"}>
						<Heading fontSize={"4xl"} textAlign={"center"}>
							Sign up
						</Heading>
						<Text fontSize={"lg"} color={"gray.600"}>
							to know keep updated with our progress ✌️
						</Text>
					</Stack>
					<Box
						rounded={"lg"}
						bg={useColorModeValue("white", "gray.700")}
						boxShadow={"lg"}
						p={8}
					>
						<Stack spacing={4}>
							<HStack>
								<Box>
									<FormControl id="firstName" isRequired>
										<FormLabel>First Name</FormLabel>
										<Input name='fName' type="text" />
									</FormControl>
								</Box>
								<Box>
									<FormControl id="lastName">
										<FormLabel>Last Name</FormLabel>
										<Input name='lName' type="text" />
									</FormControl>
								</Box>
							</HStack>
							<FormControl id="email" isRequired>
								<FormLabel>Email address</FormLabel>
								<Input name='email' type="email" />
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input name='password' type={showPassword ? "text" : "password"} />
									<InputRightElement h={"full"}>
										<Button
											variant={"ghost"}
											onClick={() =>
												setShowPassword((showPassword) => !showPassword)
											}
										>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<FormControl id="cpassword" isRequired>
								<FormLabel>Confirm Password</FormLabel>
								<InputGroup>
									<Input name='cpassword' type={showPassword ? "text" : "password"} />
									<InputRightElement h={"full"}>
										<Button
											variant={"ghost"}
											onClick={() =>
												setShowPassword((showPassword) => !showPassword)
											}
										>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									loadingText="Submitting"
									size="lg"
									bg={"blue.400"}
									color={"white"}
									_hover={{
										bg: "blue.500",
									}}
								>
									Sign up
								</Button>
							</Stack>
							<Stack pt={6}>
								<Text align={"center"}>
									Already a user? <Link color={"blue.400"}>Login</Link>
								</Text>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</Flex>
		</AuthLayout>
	);
};

export default Signup;
