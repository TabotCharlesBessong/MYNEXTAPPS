
export const getUser = async () => {
	const response = await fetch('http://localhost:3000/api/user');
	const json = await response.json();

	return json;
};
