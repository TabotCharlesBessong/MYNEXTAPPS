import { useEffect } from "react";
import {Header} from "../components"

export default function NotFound() {
	useEffect(() => {
		document.title = "Not Found - Instagram";
	}, []);

	return (
		<div className="bg-gray-background">
			<Header />
			<div className="mx-auto max-w-screen-lg">
				<p className="text-center text-4xl my-20 mx-auto">Not Found!</p>
			</div>
		</div>
	);
}
