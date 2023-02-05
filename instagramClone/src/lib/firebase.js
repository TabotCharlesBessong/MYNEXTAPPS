import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// import { seedDatabase } from '../seed';

const config = {
	apiKey: "AIzaSyDgl-5QUcBC9Tcu74nVys1b69jfAbzhdYw",
  authDomain: "twitter-react-3371b.firebaseapp.com",
  projectId: "twitter-react-3371b",
  storageBucket: "twitter-react-3371b.appspot.com",
  messagingSenderId: "532715213869",
  appId: "1:532715213869:web:b442cf30aef1f09619d4a4",
  measurementId: "G-RH1Q7BJ0QD"
};

const firebase = Firebase.initializeApp(config)
const {FieldValue} = Firebase.firestore

console.log('firebase',firebase)

// seedDatabase(firebase)

export {firebase,FieldValue}