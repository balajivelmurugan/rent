// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoBjLUhCIrMc0YgleAmiBWj1j_hwWyauw",
  authDomain: "balaji-1993.firebaseapp.com",
  databaseURL: "https://balaji-1993-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "balaji-1993",
  storageBucket: "balaji-1993.firebasestorage.app",
  messagingSenderId: "410399770299",
  appId: "1:410399770299:web:13b1f9fd7924515f028b9e",
  measurementId: "G-T9YPZL1643"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);