// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuXFiS6zeNvm8IqXqY7FSmsQPYfzpqt_w",
  authDomain: "mosquito-rippler.firebaseapp.com",
  projectId: "mosquito-rippler",
  storageBucket: "mosquito-rippler.appspot.com",
  messagingSenderId: "122076932552",
  appId: "1:122076932552:web:dd0bd15c374868094738fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializeFirestore(app, { localCache: persistentLocalCache(/*settings*/ {}) });

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
