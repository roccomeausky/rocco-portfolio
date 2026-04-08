import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHLRgxvv53ZgE79BznM_peH7xeTJCWDZ4",
  authDomain: "rocco-portfolio.firebaseapp.com",
  projectId: "rocco-portfolio",
  storageBucket: "rocco-portfolio.firebasestorage.app",
  messagingSenderId: "339706440418",
  appId: "1:339706440418:web:46f3a959a131546b498cbb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);