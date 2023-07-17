// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIVl9iWyEHAALxN39vz9pteyD6J-scRJc",
  authDomain: "banglabook-92cb9.firebaseapp.com",
  projectId: "banglabook-92cb9",
  storageBucket: "banglabook-92cb9.appspot.com",
  messagingSenderId: "676124935486",
  appId: "1:676124935486:web:e1eb937725e5e05aa0986f",
  measurementId: "G-NFPL119BLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app ;
export const storage = getStorage();
export const db = getFirestore()