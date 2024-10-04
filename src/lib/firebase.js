import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "tattletown-51333.firebaseapp.com",
  projectId: "tattletown-51333",
  storageBucket: "tattletown-51333.appspot.com",
  messagingSenderId: "1066749310277",
  appId: "1:1066749310277:web:bd070f3898e4b388747a2c"
};

const app = initializeApp(firebaseConfig); 

export const auth = getAuth() 
export const db = getFirestore()
export const storage = getStorage()