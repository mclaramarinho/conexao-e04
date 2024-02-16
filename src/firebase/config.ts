import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvk5KREYYc4d4REj0wHSOcYGYOfRoqgTg",
  authDomain: "conexao-e04.firebaseapp.com",
  projectId: "conexao-e04",
  storageBucket: "conexao-e04.appspot.com",
  messagingSenderId: "342107632492",
  appId: "1:342107632492:web:27e2add0faa564d9803949"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const a = getAuth(app);