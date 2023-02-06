import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from  'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAQzt3I3_RVB01jAZ0BvsoV-ToF0k5lli4",
  authDomain: "levon-web.firebaseapp.com",
  projectId: "levon-web",
  storageBucket: "levon-web.appspot.com",
  messagingSenderId: "387476846558",
  appId: "1:387476846558:web:8251789cf6722297f2cf4f"
};

// Initialize Firebase for server side rendering
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const firestore = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {app,auth,storage,firestore}