import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD9HO1oiyvRRJYbcxrzWvVIZsiqa-jw2z0",
  authDomain: "vacansii-zeta.firebaseapp.com",
  databaseURL:
    "https://vacansii-zeta-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vacansii-zeta",
  storageBucket: "vacansii-zeta.appspot.com",
  messagingSenderId: "1085653743039",
  appId: "1:1085653743039:web:6a0a05d6fe3145b03e5d0a",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
