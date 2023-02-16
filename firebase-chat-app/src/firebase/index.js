import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: process.env.NEXT_API_KEY,
	authDomain: process.env.NEXT_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_DATABASE_URL,
	projectId: process.env.NEXT_PROJECT_ID,
	storageBucket: process.env.NEXT_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_MESSAGING_ID,
	appId: process.env.NEXT_APP_ID,
	measurementId: process.env.NEXT_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore()

export {app,auth,db}
