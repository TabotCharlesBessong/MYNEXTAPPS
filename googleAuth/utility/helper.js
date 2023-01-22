
export const getUsers  = async () => {
	const response = await fetch('http://localhost:3000/api/user');
	const json = await response.json();

	return json;
};

// fetching a single user
export const getUser = async (userId) => {
  const response = await fetch(`${process.env.BASE_URL}/api/user/${userId}`)
	const json = await response.json()

	if(json) return json

	return {}
}

// posting a new user
export async function addUser(formData){
	try {
		const Options = {
      method:'POST',
			headers:{'Content-Type':'Application/json'},
			body:JSON.stringify(formData)
		}

		const response = await fetch('http://localhost:3000/api/user',Options)
	const json = await response.json()

	return json
	} catch (error) {
		return error
	}
}


// update user
export async function updateUser(userId,formData){
	const Options = {
		method: "PUT",
		headers: { "Content-Type": "Application/json" },
		body: JSON.stringify(formData),
	};

	const response = await fetch(
		`http://localhost:3000/api/user/${userId}`,
		Options
	);
	const json = await response.json();

	return json;
}

// delete user
export async function deleteUser(userId){
	const Options = {
		method: "DELETE",
		headers: { "Content-Type": "Application/json" },
	};

	const response = await fetch(
		`http://localhost:3000/api/user/${userId}`,
		Options
	);
	const json = await response.json();

	return json;
}