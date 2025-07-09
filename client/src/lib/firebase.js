// client/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkoMq3JnQqurp8Sk_DRgMAJ7R_S-qPdck",
  authDomain: "medconnect420degree.firebaseapp.com",
  projectId: "medconnect420degree",
  storageBucket: "medconnect420degree.appspot.com",
  messagingSenderId: "955992484926",
  appId: "1:955992484926:web:691ebae87208cb83c6f56f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
