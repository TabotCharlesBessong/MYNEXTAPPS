
import images from './images'

const navItems = [
	{
		label: "Motivation",
		children: [
			{
				label: "Solving African Problems",
				subLabel:
					"Solving African Problems in different field with the use of technology",
				href: "/motivation/1",
			},
			{
				label: "Reducing effect of global warming",
				subLabel: "Up-and-coming Designers",
				href: "/motivation/2",
			},
		],
	},
	{
		label: "Products",
		children: [
			{
				label: "Job Board",
				subLabel: "Find your dream design job",
				href: "/product/1",
			},
			{
				label: "Freelance Projects",
				subLabel: "An exclusive list for contract work",
				href: "/product/2",
			},
		],
	},
	{
		label: "Team",
		href: "/team",
	},
	{
		label: "About Us",
		href: "/about",
	},
	{
		label: "Contact Us",
		href: "/message",
	},
];

const team = [
	{
		id: 1,
		lastName: "Asongna",
		firstName: "Brilan",
		role: "ROS developer",
		responsibility:
			"allows developers to easily simulate their robot in any environment, before deploying anything in the real world",
		image: images.brilan
	},
	{
		id: 2,
		lastName: "Tabot",
		firstName: "Charles",
		role: "Web and ML developer",
		responsibility:
			"Build website for the LEVON team and develope machine learning algorithm for the vehicle",
		image: images.charles
	},
	{
		id: 3,
		lastName: "Tambu",
		firstName: "Precious",
		role: "Security/ROS developer",
		responsibility:
			"In charge of security of the AI robotic model of the Vehicle",
		image:images.precious
	},
	{
		id:4,
		lastName:"Agwe",
		firstName:"Roy",
		role:"Electronic",
		responsibility:"Building the battery and motor",
		image:images.roy
	}
];

const data = {
  navItems,
	team
}

export default data
