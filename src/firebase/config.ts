import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FB_DOMAIN + ".firebaseapp.com",
  projectId: import.meta.env.VITE_FB_DOMAIN ,
  storageBucket: import.meta.env.VITE_FB_DOMAIN +  ".appspot.com",
  messagingSenderId: import.meta.env.VITE_MSG_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const a = getAuth(app);