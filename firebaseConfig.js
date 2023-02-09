// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnpOKcGY1kRsLx-lYF3nuHWWN-Fin1YpE",
  authDomain: "abelszarja.firebaseapp.com",
  projectId: "abelszarja",
  storageBucket: "abelszarja.appspot.com",
  messagingSenderId: "588270074589",
  appId: "1:588270074589:web:aeb41b02ef4f70ee2ff934",
  measurementId: "G-HBCCC4X7NJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
