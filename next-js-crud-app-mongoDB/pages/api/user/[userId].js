
import connectDB from "../../../database/connection";
import {
	getUsers,
	postUser,
	putUser,
	deleteUser,
	getUser
} from "../../../database/controller";

export default async function handler(req,res){
	connectDB().catch(() =>
		res.status(405).json({ error: "Error in the Connection" })
	);
	const {method} = req

	switch(method) {
		case 'GET':
			getUser(req,res)
		  break;
		default:
			res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;

	}
}