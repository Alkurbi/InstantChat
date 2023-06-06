// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbqDD8RNyVaIOSyRuudZ3Rz0xFo0lBzt0",
  authDomain: "instantchat-16fa1.firebaseapp.com",
  projectId: "instantchat-16fa1",
  storageBucket: "instantchat-16fa1.appspot.com",
  messagingSenderId: "702846153043",
  appId: "1:702846153043:web:4b3d643c2807027350b1a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);