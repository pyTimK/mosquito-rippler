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
  apiKey: "AIzaSyDEcByWdsCGm5a5L8E3Pv-ByQ56mLAr2H4",
  authDomain: "smartinteractivehealthkiosk.firebaseapp.com",
  projectId: "smartmedicalkiosk",
  storageBucket: "smartmedicalkiosk.appspot.com",
  messagingSenderId: "623176063883",
  appId: "1:623176063883:web:344d5a25b7205869a1ed8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeFirestore(app, { localCache: persistentLocalCache(/*settings*/ {}) });

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
