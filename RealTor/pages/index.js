import Head from "next/head";
import Link from 'next/link'
import Image from 'next/image'
import {Flex,Box,Text,Button} from '@chakra-ui/react'
import { baseUrl,fetchApi } from "../utils/fetchApi";
import { Property } from "../components";

const Banner = ({purpose,title1,title2,desc1,buttonText,linkName,desc2,imgUrl}) => {
	return (
		<Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
			<Image src={imgUrl} alt="Banner" width={500} height={300} />
			<Box p="5">
				<Text color="gray.500" fontSize="sm" fontWeight="medium">
					{purpose}
				</Text>
				<Text fontSize="3xl" fontWeight="bold">
					{title1} <br /> {title2}
				</Text>
				<Text color='gray.700' fontSize="lg" paddingTop='3' paddingBottom='3' fontWeight="medium">
					{desc1} <br /> {desc2}
				</Text>
				<Button fontSize='xl'  >
					<Link href={linkName}>{buttonText}</Link>
				</Button>
			</Box>
		</Flex>
	);
}

export default function Home({propertiesForSale,propertiesForRent}) {
	console.log({propertiesForSale,propertiesForRent})

	return (
		<Box>
			<Head>
				<title>Home Page</title>
			</Head>

			<main>
				<h1 className="text-5xl text-green-500">Hello My World</h1>
				<Banner
					purpose="RENT A HOME"
					title1="Rental Homes for"
					title2="Everyone"
					desc1="Explore Renting"
					desc2="and more"
					buttonText="Explore Renting"
					linkName="/search?purpose=for-rent"
					imgUrl="/../public/assets/house.jpg"
				/>
				<Flex flexWrap="wrap">
					{/*  */}
					{propertiesForRent.map((property) => (
						<Property property={property} key={property.id} />
					))}
				</Flex>
				<Banner
					purpose="BUY A HOME"
					title1="Sales Homes for"
					title2="Everyone"
					desc1="Explore Closing"
					desc2="and more"
					buttonText="Explore Buying"
					linkName="/search?purpose=for-sale"
					imgUrl="/../public/assets/family (5).jpg"
				/>
				<Flex flexWrap="wrap">
					{/*  */}
					{propertiesForSale.map((property) => (
						<Property property={property} key={property.id} />
					))}
				</Flex>
			</main>
		</Box>
	);
}

export async function getStaticProps(){
	const propertyForSale = await fetchApi(
		`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=8&sort=city-level-score`
	);

	const propertyForRent = await fetchApi(
		`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=8&sort=city-level-score`
	);

	return {
		props: {
			propertiesForSale: propertyForSale?.hits,
			propertiesForRent: propertyForRent?.hits,
		},
	};
}