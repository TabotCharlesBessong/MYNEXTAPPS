import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import FirebaseContext from "./context/firebase";
import { FieldValue,firebase } from './lib/firebase';

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<FirebaseContext.Provider value={{firebase,FieldValue}} >
			<App />
		</FirebaseContext.Provider>
	</React.StrictMode>
);
