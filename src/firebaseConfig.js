// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuY098CWWNdanMbaVlaNiA-bIfI3z99hY",
  authDomain: "bulkcalling-8df54.firebaseapp.com",
  projectId: "bulkcalling-8df54",
  storageBucket: "bulkcalling-8df54.firebasestorage.app",
  messagingSenderId: "910086790714",
  appId: "1:910086790714:web:37ffdbf5a2e1b3a2bf1f03",
  measurementId: "G-MJJR22S5HH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
