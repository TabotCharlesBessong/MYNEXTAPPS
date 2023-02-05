import '../styles/globals.css'
import UserContext from "../context/user";
import useAuthListener from "../hooks/useAuthListener";
import FirebaseContext from "../context/firebase";
import { FieldValue,firebases } from '../lib/firebase';
//create client 

export default function App({ Component, pageProps }) {
	const { user } = useAuthListener;
  return (	
		<FirebaseContext.Provider value={{firebase,FieldValue}}>
		<UserContext.Provider value={{ user }}>

		<Component {...pageProps} />
		</UserContext.Provider>
		</FirebaseContext.Provider>
	);
}
